//client store
import '../composants/order.css'
import '../composants/about.css'

import officebuild from '../imgs/images-39.jpeg'

import { getAuth, onAuthStateChanged } from "firebase/auth";

import ok from '../imgs/images-37.jpeg'

import cart from '../imgs/cart.png'

import bttt from '../imgs/bttt.png'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'
import webmarket from '../imgs/digital.jpeg'
import webapp from '../imgs/webapp.jpeg'
import app from '../imgs/app.jpeg'
import helpic from '../imgs/help.png'


const Store=()=>{
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



    const innWidth=window.innerWidth
    useEffect(()=>{
        if(innWidth<=460){
           calcScroll()
        }
    })

    const authenticate=getAuth()
    useEffect(()=>{

        onAuthStateChanged(authenticate, (auth)=>{
            if(!auth){
                window.location.assign('/auth')
            }
        })
            
        })

    if(innWidth<=460){
        return(
            <div>
                    <div id='progress'>
                        <span id='progress-value'>
                            <b><img src={bttt} style={{width:'100%'}} /></b>
                        </span>
                    </div>


                    


                  
            <div className="screen">
                
           

                <div className="phonecontent">
                    <p style={{color:'darkorange',marginTop:'5%', textAlign:'center', letterSpacing:'2px', fontWeight:'500', fontSize:'140%'}}>Que désirez-vous?</p><br />
                    <div className='article'>
                        <p>application web</p>
                        <img src={webapp} className='articleimg'/>
                        <a><Link to='/webapp'><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='article'>
                        <p>application mobile</p>
                        <img src={app} className='articleimg'/>
                        <a><Link to='/mobile' style={{textDecoration:'none'}}><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='article'>
                        <p>marketing web</p>
                        <img src={webmarket} className='articleimg'/>
                        <a><Link to='/marketing'><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='article'>
                        <p>autres services</p>
                        <img src={officebuild} className='articleimg'/>
                        <a><Link to='/contact'><img src={cart} className='order' /></Link></a>
                    </div>

                <hr style={{border:"none", height:'1px', boxShadow:'0 1px 5px darkorange'}} />


                    
                    <div className='xx'>
                      <Link to='/ori' style={{textDecoration:'none'}}><img src={helpic} className='phoneimg'/> <p style={{fontWeight:'600'}}>Orientation?
                        </p></Link> 
                      
                    </div>

                    
                    <div className='xx'>
                       <Link to='/contact' style={{textDecoration:'none'}}><img src={ok} className='phoneimg'/> <p style={{fontWeight:'600'}}>Déjà servi?</p></Link>
                            </div>

                  


                </div>




        </div> <br />

        </div>
        )

    }

    else{
        return(
            <div>
                    <div id='progress'>
                        <span id='progress-value'>
                            <b><img src={bttt} style={{width:'100%'}} /></b>
                        </span>
                    </div>

                <div className="desktopcontent">
                    <p style={{color:'darkorange',marginTop:'5%', textAlign:'center', letterSpacing:'2px', fontWeight:'500', fontSize:'220%'}}>Que désirez-vous?</p><br />
                    <div className='dtarticle'>
                        <p>application web</p>
                        <img src={webapp} className='articleimg'/>
                        <a><Link to='/webapp'><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='dtarticle'>
                        <p>application mobile</p>
                        <img src={app} className='articleimg'/>
                        <a><Link to='/mobile' style={{textDecoration:'none'}}><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='dtarticle'>
                        <p>marketing web</p>
                        <img src={webmarket} className='articleimg'/>
                        <a><Link to='/marketing'><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='dtarticle'>
                        <p>autres services</p>
                        <img src={officebuild} className='articleimg'/>
                        <a><Link to='/contact'><img src={cart} className='order' /></Link></a>
                    </div>

                <hr style={{border:"none", height:'1px', boxShadow:'0 1px 5px darkorange'}} />


                    
                    <div className='dtxx'>
                      <Link to='/ori' style={{textDecoration:'none'}}><img src={helpic} className='phoneimg'/> <p style={{fontWeight:'600'}}>Orientation?
                        </p></Link> 
                      
                    </div>

                    
                    <div className='dtxx'>
                       <Link to='/contact' style={{textDecoration:'none'}}><img src={ok} className='phoneimg'/> <p style={{fontWeight:'600'}}>Déjà servi?</p></Link>
                            </div>

                  


                </div>




        <br />

        </div>
        )



    }




}
export default Store
