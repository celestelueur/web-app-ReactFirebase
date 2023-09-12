//marketing view

import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import ex from '../firebase'
import '../composants/home.css'
import '../composants/order.css'
import '../composants/about.css'
import { getAuth, onAuthStateChanged } from "firebase/auth"
const MarketingView=()=>{
         
const innwidth=window.innerWidth
const fs=ex[3]

const [user, setUser]=useState({})
const {id}=useParams()

let mm=id



const [offers, setOffers]=useState([])
//const [offers, setOffers]=useState([])
   
const dbRef=fs.firestore().collection('offers')//.orderBy('timestamp', 'desc')
useEffect(()=>{
    const go=async()=>{
    dbRef.onSnapshot(
        querySnapshot=>{
            const offer=[]
            querySnapshot.forEach((doc)=>{
                const {offername, price, description, category, arr}=doc.data()
                offer.push({
                    id:doc.id,
                    offername,
                    price,
                    description,
                    category,
                    arr
        
                })
            })
            setOffers(offer)
        }
    )

    }
    go()

}, [])


const authenticate=getAuth()
useEffect(()=>{

    onAuthStateChanged(authenticate, (auth)=>{
        if(!auth){
            window.location.assign('/auth')
        }
    })
        
    })

    for(let a of offers){
      if(mm===a.id){
if(innwidth<=460){//mobile version
    return(
      <div className="screen">
        <div className="phonecontent"><br /><br />
          <div className="view">
        <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>{a.offername} </p><br />
        <p><img src={a.arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                <p id='price'>USD {a.price} </p>
                <p style={{color:'white', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Catégorie: {a.category}</p>
                                    <p style={{color:'darkorange', marginBottom:'4%', letterSpacing:'1px', width:'90%', wordWrap:'break-word', marginLeft:'5%'}}>{a.description}</p><br /></div>
                                    <Link to='/marketing'>
                        <button id='back'>retour</button>
                    </Link>
                    <br />

                    <button style={mystyle.btn}><Link to={`/buy/${id}`} style={{textDecoration:'none', color:'white'}}>je commande</Link></button>
        </div>
        <br /><br /><br />
      </div>
    )
  }
  else{
    return(
      
        <div className="desktopcontent"><br /><br />
          <div className="view">
        <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>{a.offername} </p><br />
        <p><img src={a.arr} alt='offerimg' style={{width:'60%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                <p id='price'>USD {a.price} </p>
                <p style={{color:'white', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>Catégorie: {a.category}</p>
                                    <p style={{color:'darkorange', marginBottom:'4%', letterSpacing:'1px', width:'90%', wordWrap:'break-word', marginLeft:'5%'}}>{a.description}</p><br /></div>
                                    <Link to='/marketing'>
                        <button id='back'>retour</button>
                    </Link>
                    <br />

                    <button style={mystyle.btn}><Link to={`/buy/${id}`} style={{textDecoration:'none', color:'white'}}>je commande</Link></button>
       
        <br /><br /><br />
      </div>
    )
  }
}}





}

export default MarketingView

const mystyle={
    btn:{
      border:'none',
      width:'50%',
      padding:'3%',
      background:'-webkit-linear-gradient(darkorange, orangered)',
      color:'white',
      borderRadius:'20px 20px',
      marginLeft:'25%',
      letterSpacing:'1px',
      marginBottom:'8%'
    }
  }