//marketing
import '../composants/home.css'
import '../composants/order.css'
import ex from '../firebase'
import carticon from '../imgs/cart.png'
import seeicon from '../imgs/view.png'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
const fs=ex[3]
const Marketing=()=>{

    const [data, setData]=useState({})
    const innwidth=window.innerWidth
    



    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth, (x)=>{
            if(!x){
                window.location.assign('/')
            }
        })
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


    if(innwidth<=460){//mobile version


            return(
                <div className="screen">

                <div className="phonecontent">
                
                   
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>Offres Marketing Digital</p><br />

                   
                   
                        
                            
                            { 
                            Object.keys(offers).reverse().map((id, index)=>{
                            if(offers[id].category==='Marketing Digital'){
                                return(
                                    <div key={id} className='offercontent'>
                                       <br />
                                       <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr} alt='offerimg' style={{width:'100%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                      
                                        <button className='btn'><Link to={`/marketingview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                   
                                    </div>
                                )
                            }
        
                            })}
                       
                    </div>
                </div>
            )
                        }

            else{
                return(
                   
    
                    <div className="desktopcontent">
                    
                       
                        <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'160%'}}>Offres Marketing Digital</p><br />
    
                       
                       
                            
                                
                                { 
                                Object.keys(offers).reverse().map((id, index)=>{
                                if(offers[id].category==='Marketing Digital'){
                                    return(
                                        <div key={id} className='dtoffercontent'>
                                           <br />
                                           <p>{offers[id].offername.toUpperCase()}</p>
                                        <p><img src={offers[id].arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                       
    
                                        <section>
                                            <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                          
                                            <button className='btn'><Link to={`/marketingview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                        </section>
                                       
                                        </div>
                                    )
                                }
            
                                })}
                           
                        </div>
                   
                )
            }

}
export default Marketing
