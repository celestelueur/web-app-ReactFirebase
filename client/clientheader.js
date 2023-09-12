//header client
import '../composants/header.css'
import akicon from '../imgs/ak.png'
import ig from '../imgs/instagram.png'
import wa from '../imgs/whatsapp.png'
import menu from '../imgs/menu.png'
import { getAuth, onAuthStateChanged} from "firebase/auth";
import ex from '../firebase'
import fb from '../imgs/facebook.png'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import moon from '../imgs/moon.png'
import sun from '../imgs/sun.png'

import "../allin.css"
import homeicon from '../imgs/home-1.png'
import addicon from '../imgs/shopping-bag.png'
const fib=ex[0]
const ClientHeader=()=>{
    const innWidth=window.innerWidth
    const [open, setOpen]=useState(true)
    const [dark, setDark]=useState(true)
    const [user, setUser]=useState({})
    const [activeTab, setActiveTab]=useState('Home')
    const location=useLocation()

    useEffect(()=>{
        if(location.pathname===`/`){
            setActiveTab('Home')
        }
        else if(location.pathname===`/store`){
            setActiveTab('Store')
        }
        else if(location.pathname!=='/'){
            setActiveTab('Store')
        }

}, [location])



    const menushower=()=>{
        setOpen(!open)
        let pos=document.documentElement.scrollTop
        if(pos>=20){
            document.documentElement.scrollTop=0
        }
    }
    //const {id}=useParams()
    const toggletheme=()=>{
        
        setDark(!dark)
        const usertheme={
            thememode: !dark? true:false
        }
        onAuthStateChanged(auth, (x)=>{
            
            fib.child(`users/${x.uid}`).set(usertheme, (err)=>{
                if(err) alert(err)
            })
        })
        
    }

    const auth=getAuth()

 

    useEffect(()=>{
        onAuthStateChanged(auth, (x)=>{
        fib.child(`users/${x.uid}`).on('value', (snapshot)=>{
            if(snapshot.val()!==null){
                setUser({...snapshot.val()})
            } else{
                setUser({})
            }
        })

        return ()=>{
            setUser({})
        }
    })
    }, [fib])

    

    
    useEffect(()=>{
        onAuthStateChanged(auth, (authenticated)=>{
            authenticated? setDark(user.thememode):setDark(true)
        })
    }) 
  
    //for desktops, height is 763 and width 1496
    //for mobile phone height approx 564-600 and width 360
    //for tablets
    useEffect(()=>{
        window.onclick=e=>{
            if(!e.target.matches('#id')){
                let el=document.querySelectorAll('.showmenu')
                for(let a of el){
                    if(a.classList.contains('showmenu')) setOpen(!open)
                }
            }
        }
    })


    useEffect(()=>{
        if(!dark){
            document.querySelector('body').style.background='white'           
        }
        else{
              document.querySelector('body').style.background='#111'            
        }

    })

    /*  <a><Link className='act' to='/'><img src={homeicon} style={{width:'25%', height:'25%'}}/></Link></a>
                    <a><Link className='act' to='/store' ><img src={addicon} style={{width:'25%', height:'25%'}} /></Link></a>


    */

    if(innWidth<=480){
        return(
            <div className='mobileheader'>
                    <div className={!open? 'showmenu':'menulist'}>                       
                        <a onClick={toggletheme}>{dark? 'mode jour':'mode nuit'}</a>
                        <a><Link to='/offer' style={{textDecoration:'none', color:'white'}} >offres</Link></a>
                        <a><Link to='/contact'  style={{textDecoration:'none', color:'white'}}>nous contacter</Link></a>
                        <a><Link to='/ori'  style={{textDecoration:'none', color:'white'}}>page d'aide</Link></a>
                        <a>règlements</a>
                        <a>à propos</a>                        
                    </div>
           
            <div className='phoneheader'>
                <div className='phonemaintitle'><img src={akicon} alt='altokudos' style={{width:'16%', height:'80%', position:'absolute', marginTop:'0%'}} /></div>
                <div id='headlinks'>
                    <a href='https://wa.me/243815173726'><img src={wa} className='headlinksimg' alt='headimg' /></a>
                    <a href='https://www.instagram.com/altokudos' rel='noopener'><img src={ig} className='headlinksimg' alt='headimg' /></a>
                    <a href='https://www.facebook.com/profile.php?id=100088305057744&mibextid=ZbWKwL' rel='noopener'><img src={fb} className='headlinksimg' alt='headimg' /></a>
                    <a><img src={menu} onClick={menushower} id='id'  className='headlinksimg' alt='headimg' /></a>
                </div>
                </div>

                <div className='phonetab'>         
                    <a className={`${activeTab==='Home'? "activeHome" : "" }`} onClick={()=>setActiveTab('Home')} ><Link to='/'  style={{textDecoration:'none', color:'#ddd'}}><img src={homeicon} style={{width:'16%', height:'25%'}}/><br />accueil</Link></a>
                    <a className={`${activeTab==='Store'? "activeHome" : "" }`} onClick={()=>setActiveTab('Store')} ><Link to='/store' style={{textDecoration:'none', color:'#ddd'}}><img src={addicon} style={{width:'16%', height:'25%'}} /><br />boutique</Link></a>              
                </div>
            </div>
        )

    }

    else{
        return(
            <div className='desktop-header'>
            

                <div className='desktop-head'>
                   <img src={akicon} alt='altokudos' style={{width:'30%'}} />
                </div>

                <button id='switch' onClick={toggletheme}><img src={dark? sun:moon} alt='theme'/></button>

                <div className='phonetab'>         
                    <a className={`${activeTab==='Home'? "activeHome" : "" }`} onClick={()=>setActiveTab('Home')} ><Link to='/'  style={{textDecoration:'none', color:'#ddd'}}><img src={homeicon} style={{width:'10%', height:'25%'}}/><br />accueil</Link></a>
                    <a className={`${activeTab==='Store'? "activeHome" : "" }`} onClick={()=>setActiveTab('Store')} ><Link to='/store' style={{textDecoration:'none', color:'#ddd'}}><img src={addicon} style={{width:'10%', height:'25%'}} /><br />boutique</Link></a>              
                </div>


            </div>
        )


    }


}
export default ClientHeader

