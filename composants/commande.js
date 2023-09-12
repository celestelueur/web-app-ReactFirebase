//commande
import './home.css'
import './order.css'
import './about.css'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Commande=()=>{

    const innWidth=window.innerWidth
    const [fb, store, auth]=ex
    const [data, setData]=useState({})

    useEffect(()=>{
        fb.child('orders').on('value', (snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()})
            } else{
                setData({})
            }
        })

        return ()=>{
            setData({})
        }
    }, [])

    const onDelete=id=>{
        if(window.confirm('voulez-vous vraiment effacer?')){
            fb.child(`orders/${id}`).remove((err)=>{
                err? alert(err):alert('commande supprimée')
            })
        }
    }


    let lik=Object.keys(data).reverse()

    if(innWidth<=460){

        return(
            <div>
               
                
                <div className="screen">

                <div className="phonecontent">
                    <br />
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Commandes</p><br />
                    {
                        Object.keys(data).reverse().map((id, index)=>{
                          
                            return(
                                <div key={id} className='offercontent'>
                                    <br />
                                    <p>{data[id].acheteur} a commandé:</p>
                                    <p>{data[id].nom.toUpperCase()}</p>
                                    <p><img src={data[id].image} alt='offerimg' style={{width:'60%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                    <p>{data[id].prix}$ </p>
                                    <p>Numéro du client: {data[id].numero}</p>
                                    <p>Adresse du client: {data[id].mail} </p>
                                    <p><sub style={{color:'darkmagenta'}}>{data[id].time}</sub> </p>
                                    <section>
                                        <button className='btn' onClick={()=>onDelete(id)} ><img src={deleteicon} alt='del' style={{width:"60%"}} /></button>
                                       
                                        <button className='btn'><Link to={`/offrevue/${id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )
                            })


                    }
                    

            </div>
            </div>
            
                    </div>

        )
                    
                    

                


    }




}
export default Commande
