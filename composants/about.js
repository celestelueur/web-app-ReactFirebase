//about
import './about.css'
import plus from '../imgs/plus.png'
import mailer from '../imgs/email_send.png'
import webbuild from '../imgs/images-36.jpeg'
import officebuild from '../imgs/images-39.jpeg'
import appbuild from '../imgs/images-40.jpeg'
import otherbuild from '../imgs/images-38.jpeg'
import view from '../imgs/see.png'
import addtocart from '../imgs/purchase.png'
import msg from '../imgs/message.png'
import callicon from '../imgs/call.png'
import akic from '../imgs/ak (2).jpg'
import {NavLink, Route,Routes} from 'react-router-dom'
import seeimg from '../imgs/se.png'
import cart from '../imgs/cart.png'
import pls from '../imgs/add.png'
const About=()=>{

    const innWidth=window.innerWidth
    
    if(innWidth<=480){
        return(
            <div className="screen">
                <h2 className='mobilepagetitle'>nos services</h2>
           

                <div className="phonecontent">
                    <h2 id='phonedetailtitle'>Création site web</h2>
                    <div id="phonest">
                       <img src={webbuild} className='phoneimg'/> <p>altokudos vous propose son service de création de sites web interactifs de toute sorte proposant ainsi<br />
                        des méthodes afin de les monétiser avec Google Ads et autres. <br />
                        Pour vos entreprises, blogs ou business, altokudos pourrait répondre à vos besoins  
                        </p>
                        <ul className='phoneic'>
                            <li><img src={pls} style={{width:'12%', height:'12%'}} /></li>
                            
                            <li><img src={seeimg} style={{width:'12%', height:'12%'}} /></li>
                        </ul>
                    </div>

                    <h2 id='phonedetailtitle'>Création application mobile</h2>
                    <div id="phonend">
                       <img src={appbuild} className='phoneimg'/> <p>altokudos vous propose également son service de création des applications mobiles de toute sorte proposant ainsi<br />
                        des méthodes afin de les monétiser avec Google Ads et autres. <br />
                        Pour vos entreprises, blogs ou business, altokudos app development pourrait réaliser vos visions et professionnaliser vos services  
                        </p>
                        <ul className='phoneic'>
                            <li><img src={cart} style={{width:'12%', height:'12%'}} /></li>
                            
                            <li><img src={seeimg} style={{width:'12%', height:'12%'}} /></li>
                        </ul>
                    </div>

                    <h2 id='phonedetailtitle'>Facilitation de création de document MS</h2>
                    <div id="phonerd">
                       <img src={officebuild} className='phoneimg'/> <p>Et si les cybers ne servaient plus qu'à imprimer?  altokudos peut aussi créer des documents Word et Excel aux meilleurs délais<br />
                        et avec des travaux très bien réalisés par des pros de notre team. <br />
                        Pour les employés, étudiants, élèves etc. Ce service peut s'avérer très utile  
                        </p>
                        <ul className='phoneic'>
                            <li><img src={cart} style={{width:'12%', height:'12%'}} /></li>
                            
                            <li><img src={seeimg} style={{width:'12%', height:'12%'}} /></li>
                        </ul>
                    </div>


                    <h2 id='phonedetailtitle'>autres services informatiques</h2>
                    <div id="phoneth">
                       <img src={otherbuild} className='phoneimg'/> <p>Pour finir, nous pouvons vous orienter et aider dans le Marketing Digital<br />
                        et autres services informatiques basiques<br />
                        
                        </p>
                        <ul className='phoneic'>
                            <li><img src={cart} style={{width:'12%', height:'12%'}} /></li>
                            
                            <li><img src={seeimg} style={{width:'12%', height:'12%'}} /></li>
                        </ul>
                    </div>


                </div>




        </div>
        )

    }
    else{
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
export default About
