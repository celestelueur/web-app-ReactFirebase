//header part
import './header.css'
import akicon from '../imgs/ak.png'
import ig from '../imgs/instagram.png'
import msg from '../imgs/message.png'
import menu from '../imgs/menu.png'
import commande from '../imgs/cc.png'
import { getAuth, signOut } from "firebase/auth";
import "../allin.css"
import homeicon from '../imgs/home-1.png'
import addicon from '../imgs/shopping-bag.png'
import { Link, useLocation } from 'react-router-dom'
import ex from '../firebase'
import { useEffect, useState } from 'react'
const Header=()=>{
   // window.onscroll=function(){scroller()}
    const innWidth=window.innerWidth
    const [open, setOpen]=useState(true)
    const [dark, setDark]=useState(true)
    const [activeTab, setActiveTab]=useState('Home')
    const [order, setOrder]=useState({})
    const [id, setId]=useState()
    const fb=ex[0]
    
    const menushower=()=>{
        setOpen(!open)
        let pos=document.documentElement.scrollTop
        if(pos>=100){
            document.documentElement.scrollTop=0
        }
    }
    const toggletheme=()=>{
        setDark(!dark)
    }
  
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

  
        const logout=()=>{
        
            const auth = getAuth();
            signOut(auth).then(() => {
        // Sign-out successful.
            alert("déconnecté")
            window.location.assign('/')
            localStorage.clear()
            }).catch((error) => {
      // An error happened.
            alert(error)
        });
    
        
    }

    const location=useLocation()

    useEffect(()=>{
        if(location.pathname===`/`){
            setActiveTab('Home')
        }
        else if(location.pathname===`/order`){
            setActiveTab('Order')
        }
        else if(location.pathname!=='/'){
            setActiveTab('Order')
        }

}, [location])


    useEffect(()=>{
        if(!dark){
            document.querySelector('body').style.background='white'
            
        }
        else{
              document.querySelector('body').style.background='#111'
              
        }

    })

 
    useEffect(()=>{
        
        fb.child(`notification`).on('value', (snapshot)=>{
            if(snapshot.val()!==null){
                setOrder({...snapshot.val()})
                
            } else{
                setOrder({})
            }
        })

        return ()=>{
            setOrder({})
        }
    
}, [fb])
useEffect(()=>{
    if(Object.keys(order).length>=1){
        Object.keys(order).map((x,y)=>setId(x))
        document.querySelector('i').style.display='block'
        
    }

})

const del=()=>{
    fb.child(`notification`).remove((err)=>err)     
        document.querySelector('i').style.display='none'
}

    if(innWidth<=480){
        return(
            <div className='mobileheader'>

                    <div className={!open? 'showmenu':'menulist'}>
                        <a><Link to='/publier' style={{textDecoration:'none'}} >publier</Link></a>
                        <a onClick={toggletheme}>{dark? 'mode jour':'mode nuit'}</a>
                        <a onClick={logout}>déconnexion</a>
                        <a><Link to='/offre' style={{textDecoration:'none', color:'white'}} >offres</Link></a>
                        <a>nous contacter</a>
                        <a>règlements</a>
                        <a>à propos</a>
                        
                    </div>
           
            <div className='phoneheader'>
                <div className='phonemaintitle'><img src={akicon} alt='altokudos' style={{width:'16%', height:'80%', position:'absolute', marginTop:'0%'}} /></div>
                <div id='headlinks'>
                    <a><Link to='/commande'><img src={commande} className='headlinksimg' alt='headimg' /></Link></a>

                    <Link to='/commande'>
                     <i onClick={()=>del(id)} style={{display:'none',width:'6%', borderRadius:'20%',padding:'0.5%'}}>{Object.keys(order).length}</i></Link>


                    <a><img src={ig} className='headlinksimg' alt='headimg' /></a>
                    <a><Link to='/message'><img src={msg} className='headlinksimg' alt='headimg' /></Link></a>
                    <a><img src={menu} onClick={menushower} id='id'  className='headlinksimg' alt='headimg' /></a>
                </div>
                </div>

                <div className='phonetab'>
                    
                <a className={`${activeTab==='Home'? "activeHome" : "" }`} onClick={()=>setActiveTab('Home')} ><Link to='/'  style={{textDecoration:'none', color:'#ddd'}}><img src={homeicon} style={{width:'16%', height:'25%'}}/><br />accueil</Link></a>
                    <a className={`${activeTab==='Order'? "activeHome" : "" }`} onClick={()=>setActiveTab('Order')} ><Link to='/order' style={{textDecoration:'none', color:'#ddd'}}><img src={addicon} style={{width:'16%', height:'25%'}} /><br />boutique</Link></a>              
            
                          
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


            </div>
        )


    }
   

}
export default Header
