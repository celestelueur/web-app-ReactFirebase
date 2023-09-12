//client offer
import '../composants/home.css'
import '../composants/order.css'
import '../composants/about.css'
import bttt from '../imgs/bttt.png'
import ex from '../firebase'

import seeicon from '../imgs/view.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import carticon from '../imgs/cart.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const ClientOffer=()=>{
    const innWidth=window.innerWidth
    const fs=ex[3]
    const [data, setData]=useState({})

    let calcScroll=()=>{
        let scrollProgress=document.querySelector('#progress')
       // let progressVal=document.querySelector('#progress-value') 
        let pos=document.documentElement.scrollTop
        let calcHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight
        let scrollVal=Math.round((pos*100)/calcHeight) 
        scrollProgress.style.background=`conic-gradient(#ff5500 ${scrollVal}%, #11111c ${scrollVal}%)`
        if(pos>100){
            scrollProgress.style.display='grid'

        }
        else scrollProgress.style.display='none'
        scrollProgress.addEventListener('click', ()=>{
            document.documentElement.scrollTop=0
        })
    }
    window.onscroll=calcScroll
    window.onload=calcScroll

    useEffect(()=>{
        if(innWidth<=460){
           calcScroll()
        }
    })


    const [offers, setOffers]=useState([])
   
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

   let lik=Object.keys(offers).reverse()

    const authenticate=getAuth()
    useEffect(()=>{

        onAuthStateChanged(authenticate, (auth)=>{
            if(!auth){
                window.location.assign('/auth')
            }
        })
            
        })



    //let lik=Object.keys(data).reverse()

    if(innWidth<=460){

        return(
            <div>
                <div id='progress'>
                        <span id='progress-value'>
                            <b><img src={bttt} alt='' style={{width:'100%'}} /></b>
                        </span>
                    </div>
                
                <div className="screen">

                <div className="phonecontent">
                
                   
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>Toutes les offres</p><br />
                    {
                        Object.keys(offers).reverse().map((id, index)=>{
                          
                            return(
                                <div key={id} className='offercontent'>
                                    <br />
                                    <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr} alt='offerimg' style={{width:'100%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                      
                                        <button className='btn'><Link to={`/offerview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )
                            })


                    }
                    
                    <br />
            </div>
            </div>
            
                    </div>

        )
                    

    }

    else{
        return(
            <div>
                <div id='progress'>
                        <span id='progress-value'>
                            <b><img src={bttt} alt='' style={{width:'100%'}} /></b>
                        </span>
                    </div>
                
               

                <div className="desktopcontent">
                
                   
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'160%'}}>Toutes les offres</p><br />
                    {
                        Object.keys(offers).reverse().map((id, index)=>{
                          
                            return(
                                <div key={id} className='dtoffercontent'>
                                    <br />
                                    <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                      
                                        <button className='btn'><Link to={`/offerview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )
                            })


                    }
                    
                    <br />
            </div>
            </div>
            
                  

        )
                    
    }


}
export default ClientOffer