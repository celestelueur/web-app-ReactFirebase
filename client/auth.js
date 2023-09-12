//auth
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import ex from "../firebase";
import './auth.css'
import { useState } from "react";
import DOMPurify from "dompurify";
import {toast} from 'react-toastify'

const fb=ex[0]
const Auth=()=>{

    const [userinfo, setuserinfo]=useState()
    const [count, setCount]=useState(0)
    const [txt, setTxt]=useState(`Nous vous identifions utilisant une connexion anonyme pour nous permettre de vous identifier à la prochaine connexion en générant un code unique et grâce à cela nous pouvons vous reconnaitre et également vous afficher l\'historique de vos activités sur Altokudos`)
    let i

   
    
    const anonymLogin=()=>{
        const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    // Signed in..
        onAuthStateChanged(auth, (x)=>{
            
           
            const obj={
                userId:x.uid
            }
        fb.child(`users/${obj.userId}`).set(obj, (err)=>{
            document.querySelector('.txt').style.display='none'
            document.querySelector('#btn').style.display='none'
            document.querySelector('#loader').style.display='block'
            setTimeout(()=>window.location.assign('/'), 2500)
        
        })
        setuserinfo(obj.userId)
        i=userinfo
    

    })
         
    
  })

  

  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage)
    // ...
  })

    }





    return(

        <div style={mystyle.container} id='container'>
            <div style={{marginTop:'28%'}}>
                <h2 style={{color:'white'}}>ALTOKUDOS</h2>
        <p style={mystyle.txt} className='txt' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(txt)}} ></p><br />
        <button id='btn' onClick={anonymLogin} style={mystyle.button}>c'est parti</button>
        </div>
        <div id='loader'></div>
    </div>

    )


}
export default Auth

const mystyle={
    container:{
      letterSpacing:'3px', background:'black', lineHeight:'150%', fontVariant:'small-caps',
        position:'fixed',
        zIndex:'1000000',
        width:'100%',
        height:'100%', 
        top:0,
        zIndex:1111111111,
        top:'0',
       
        textAlign:'center',
        left:'0'
    },
    button:{
        background:'-webkit-linear-gradient(top, darkorange, orangered)',  color:'white', border:'none', width:'40%', padding:'2%',
        
        borderRadius:'20px 20px',
        
    },
    txt:{
        color:'white',
        fontWeight:'bold',
        width:'90%',
        wordWrap:'break-word',
        marginLeft:'5%',
        textAlign:'center',
        lineHeight:'180%',
        borderRadius:'20px 20px'

    }
}