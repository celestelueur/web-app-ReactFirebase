//offre vue
import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import ex from '../firebase'
import './home.css'
import './order.css'
import './about.css'

import { getAuth, onAuthStateChanged } from "firebase/auth"


const OffreVue=()=>{
    
const innwidth=window.innerWidth
const [fb, store, auth, fs]=ex

const [user, setUser]=useState({})
let {id}=useParams()
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
/*
useEffect(()=>{
   
    for(let a of offers){
      if(a.id===mm){
        setUser(a)
      }
    }
}, [id])
console.log("user", user)
*/

const onDelete=x=>{
  if(window.confirm('sure to delete?')){
      fs.firestore().collection('offers').doc(x).delete()
      .then(()=>alert('offre supprimée'))
      .catch((err)=>alert(err))
  }
}


for(let a of offers){
  if(mm===a.id){
    
if(innwidth<=460){//mobile version
  return(
    <div className="screen">
      <div className="phonecontent"><br /><br />
        <div className="view">
      <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>{a.offername} </p><br />
      <p><img src={a.arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
              <p id='price'>USD {a.price} </p>
                                  <p style={{color:'darkorange', marginBottom:'4%', letterSpacing:'1px', width:'90%', wordWrap:'break-word', marginLeft:'5%'}}>{a.description}</p><br /></div>
                                  <Link to='/'>
                      <button id='back'>retour</button>
                  </Link>
      </div>
    </div>
  )
}

  }
}

}
export default OffreVue