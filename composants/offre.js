//offres
import './home.css'
import './order.css'
import './about.css'

import bttt from '../imgs/bttt.png'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const Offre=()=>{
    const innWidth=window.innerWidth
    const [fb, store, auth]=ex
    const [data, setData]=useState({})

    let calcScroll=()=>{
        let scrollProgress=document.querySelector('#progress')
        let progressVal=document.querySelector('#progress-value') 
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


    useEffect(()=>{
        fb.child('offers').on('value', (snapshot)=>{
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
        if(window.confirm('sure to delete?')){
            fb.child(`offers/${id}`).remove((err)=>{
                err? toast.error(err):toast.success('offre supprimée')
            })
        }
    }


    let lik=Object.keys(data).reverse()

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
                    <br />
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Toutes les offres</p><br />
                    {
                        Object.keys(data).reverse().map((id, index)=>{
                          
                            return(
                                <div key={id} className='offercontent'>
                                    <br />
                                    <p>{data[id].offername.toUpperCase()}</p>
                                    <p><img src={data[id].img} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

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
export default Offre
