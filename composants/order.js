//order
import './order.css'
import './about.css'
import plus from '../imgs/plus.png'
import mailer from '../imgs/email_send.png'
import webbuild from '../imgs/images-36.jpeg'
import officebuild from '../imgs/images-39.jpeg'
import appbuild from '../imgs/images-40.jpeg'
import otherbuild from '../imgs/images-38.jpeg'
import view from '../imgs/see.png'
import ok from '../imgs/images-37.jpeg'
import msg from '../imgs/message.png'
import callicon from '../imgs/call.png'
import akic from '../imgs/ak (2).jpg'
import {NavLink, Route,Routes} from 'react-router-dom'
import seeimg from '../imgs/se.png'
import cart from '../imgs/cart.png'
import pls from '../imgs/add.png'
import bttt from '../imgs/bttt.png'
import { useEffect } from 'react'
import ak from '../imgs/ak.png'
import { Link } from 'react-router-dom'
import webmarket from '../imgs/digital.jpeg'
import webapp from '../imgs/webapp.jpeg'
import app from '../imgs/app.jpeg'
import helpic from '../imgs/help.png'
const Order=()=>{

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
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'500', fontSize:'140%'}}>Que désirez-vous?</p><br />
                    <div className='article'>
                        <p>application web</p>
                        <img src={webapp} className='articleimg'/>
                        <a><Link to='/'><img src={cart} className='order' /></Link></a>
                    </div>

                    <div className='article'>
                        <p>application mobile</p>
                        <img src={app} className='articleimg'/>
                        <a><img src={cart} className='order' /></a>
                    </div>

                    <div className='article'>
                        <p>marketing web</p>
                        <img src={webmarket} className='articleimg'/>
                        <a><img src={cart} className='order' /></a>
                    </div>

                    <div className='article'>
                        <p>autres services</p>
                        <img src={officebuild} className='articleimg'/>
                        <a><img src={cart} className='order' /></a>
                    </div>

                <hr style={{border:"none", height:'1px', boxShadow:'0 1px 5px darkorange'}} />


                    
                    <div className='xx'>
                       <img src={helpic} className='phoneimg'/> <p style={{fontWeight:'600'}}>Orientation?
                        </p>
                      
                    </div>

                    
                    <div className='xx'>
                       <img src={ok} className='phoneimg'/> <p style={{fontWeight:'600'}}>Déjà servi?</p>
                            </div>

                  


                </div>




        </div>

        </div>
        )

    }
    else if(innWidth>=800){
        return(
            <div className="screen">
            <h2 className='pagetitle' >nos services</h2>
                <div className="content">
                    <h2 id='detailtitle'>Création site web</h2>
                    <div className='xxx'>
                       <img src={webbuild} className='img'/> <p>altokudos vous propose son service de création de sites web interactifs de toute sorte proposant ainsi<br />
                        des méthodes afin de les monétiser avec Google Ads et autres. <br />
                        Pour vos entreprises, blogs ou business, altokudos pourrait répondre à vos besoins  
                        </p>
                        <ul>
                            <li><NavLink to='/'><img src={cart} style={{width:'4.5%', height:'5%'}} /></NavLink></li>
                            
                            <li><img src={seeimg} style={{width:'4.5%', height:'5%'}} /></li>
                        </ul>
                    </div>
                   

                    <h2 id='detailtitle'>Création application mobile</h2>
                    <div className='xxx'>
                       <img src={appbuild} className='img'/> <p>altokudos vous propose également son service de création des applications mobiles de toute sorte proposant ainsi<br />
                        des méthodes afin de les monétiser avec Google Ads et autres. <br />
                        Pour vos entreprises, blogs ou business, altokudos app development pourrait réaliser vos visions et professionnaliser vos services  
                        </p>
                        <ul>
                            <li><NavLink to='/order'><img src={cart} style={{width:'4.5%', height:'5%'}} /></NavLink></li>
                            
                            <li><img src={seeimg} style={{width:'4.5%', height:'5%'}} /></li>
                        </ul>
                    </div>

                    <h2 id='detailtitle'>Facilitation de création de document MS</h2>
                    <div className='xxx'>
                       <img src={officebuild} className='img'/> <p>Et si les cybers ne servaient plus qu'à imprimer?  altokudos peut aussi créer des documents Word et Excel aux meilleurs délais<br />
                        et avec des travaux très bien réalisés par des pros de notre team. <br />
                        Pour les employés, étudiants, élèves etc. Ce service peut s'avérer très utile  
                        </p>
                        <ul>
                            <li><NavLink to='/order'><img src={cart} style={{width:'4.5%', height:'5%'}} /></NavLink></li>
                            
                            <li><img src={seeimg} style={{width:'4.5%', height:'5%'}} /></li>
                        </ul>
                    </div>


                    <h2 id='detailtitle'>autres services informatiques</h2>
                    <div className='xxx'>
                       <img src={otherbuild} className='img'/> <p>Pour finir, nous pouvons vous orienter et aider dans le Marketing Digital<br />
                        et autres services informatiques basiques<br />
                        
                        </p>
                        <ul>
                            <li><NavLink to='/order'><img src={cart} style={{width:'4.5%', height:'5%'}} /></NavLink></li>
                            
                            <li><img src={seeimg} style={{width:'4.5%', height:'5%'}} /></li>
                        </ul>
                    </div>

                 

                    <h2 id='detailtitle'>A propos d'Altokudos</h2>
                    <div className='xxx'>
                       <img src={akic} className='img'/> <p>Altokudos est une entreprise informatique qui offre différents services aux entreprises, aux entrepreneurs et <br />
                        toute personne effectuant un business. Nous assurons un développement web dynamique avec des designs de qualité et bien plus encore<br />
                        
                        </p>
                        <ul>
                            <li><img src={callicon} style={{width:'4.5%', height:'5%'}} /></li>
                            
                            <li><img src={msg} style={{width:'4.5%', height:'5%'}} /></li>
                        </ul>

                        <ul className='footer'>
                            <li>feedback</li>
                            <li>signaler</li>
                            <li>altokudos 2022</li>
                        </ul>
                    </div>


                   
                </div>
               
               
        </div>
        )
    }

}




export default Order


