//contact us
import '../composants/about.css'
import '../composants/order.css'
import '../composants/home.css'
import fbicon from '../imgs/facebook.png'
import igicon from '../imgs/instagram.png'
import waicon from '../imgs/whatsapp.png'
import ex from '../firebase';
import DOMPurify from 'dompurify'
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const getTime=()=>{
    let n=new Date()
    let year=n.getFullYear()
    let month=n.getMonth()
    let date=n.getDate()
    let hour=n.getHours()
    let min=n.getMinutes()
    let timeout=`${hour}:${min} | ${date}/${month+1}/${year}`
    return timeout
}
const fb=ex[0]
const initialState={
    message:'',
    username:'',
    usernumber:'',
   // date:getTime()
}
const Contact=()=>{
    const [state, setState]=useState(initialState)
    const {message, username, usernumber}=state
    
    const [err, setErr]=useState('')
    const [success, setSuccess]=useState('')

    const handlemsg=e=>{
        const {name, value}=e.target   
        setState({...state, [name]:value})
    }


    
    const remerr=()=>{
        document.querySelector('.err').style.display='none'
    }

    const showerr=()=>{
        document.querySelector('.err').style.display='block'
    }

    const remsuccess=()=>{
        document.querySelector('.success').style.display='none'
    }
    
    const showsuccess=()=>{
        document.querySelector('.success').style.display='block'
    }


    const authenticate=getAuth()
    useEffect(()=>{

        onAuthStateChanged(authenticate, (auth)=>{
            if(!auth){
                window.location.assign('/auth')
            }
        })
            
        })

        const el={
            msg:message,
            name:username,
            num:usernumber,
            date:getTime()
        }

    const contactus=e=>{
        e.preventDefault()
        if(!message || !username || !username){
            setErr('Oops, veuillez remplir tous les champs')
            showerr()
            setTimeout(remerr, 4000)
        }
        else{
            fb.child(`messages`).push(el, (err)=>{
                if(err){
                    setErr(err)
                    showerr()
                    setTimeout(remerr, 4000)
                }
                else{
                    
                    setSuccess('Message envoyé')
                    showsuccess()
                    setTimeout(remsuccess, 4000)
                }
                
            })
            setTimeout(()=>window.location.assign('/'), 2000)
        }
    }
    return(
        <div className={window.innerWidth<=460? 'phonecontent':'desktopcontent'}><br />
            <p style={mystyle.p}>Dites-nous ce qu'on peut faire pour vous</p>
            <form onSubmit={contactus} encType='multipart/form-data' style={mystyle.form}>
                <textarea style={mystyle.inp} placeholder='votre message' value={message || ""} onChange={handlemsg} name='message'/>
                <input type='text' style={mystyle.inp} placeholder='votre nom' value={username || ""} onChange={handlemsg} name='username' />
                <input type='number' style={mystyle.inp} placeholder='votre numéro' value={usernumber || ""} onChange={handlemsg} name='usernumber' />
                <button type='submit' style={mystyle.sub}>envoyer</button>

            </form>
            <hr style={{border:'none', boxShadow:'0 1px 4px #333', height:'0.5px'}}/>
            <p style={mystyle.p}>vous pouvez également nous contacter via</p><br />
                <div style={mystyle.media}>
                   <a style={{textDecoration:'none'}} href='https://www.facebook.com/profile.php?id=100088305057744&mibextid=ZbWKwL' rel='noopener'><img src={fbicon} alt='media' style={mystyle.img}/></a> 
                    <a style={{textDecoration:'none'}}  href='https://wa.me/243815173726'><img src={waicon} alt='media' style={mystyle.img}/></a>
                    <a style={{textDecoration:'none'}}  href='https://www.instagram.com/altokudos' rel='noopener'> <img src={igicon} alt='media' style={mystyle.img}/></a> 
                </div><br /><br /><br /><br />
            <div className='err'>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(err)}}></p>
            </div>

            <div className='success'>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(success)}}></p>
            </div>
        </div>

    )

}
export default Contact

const mystyle={
    form:{
        textAlign:'center',
        width:'100%',
        
        
    },
    inp:{
        marginTop:'9%',
        display:'block',
        width:'60%',
        marginLeft:'17%',
        padding:'3%',
        border:'none',
        background:'transparent',
        borderRadius:'2Opx 2Opx',
        boxShadow:'0 1px 5px darkgrey',
        textAlign:'center',
        borderRadius:'20px 20px',
        color:'orangered'
    },
    sub:{
        border:'none',
        marginTop:'9%',
        background:'green',
        color:'white',
        width:'30%',
        borderRadius:'20px 20px',
        padding:'2%'
    },
    p:window.innerWidth<=460?{
        textAlign:'center',
        color:'darkorange',
        letterSpacing:'1px',
        fontSize:'100%'
    }:{
        textAlign:'center',
        color:'darkorange',
        marginTop:'2%',
        letterSpacing:'1px',
        fontSize:'140%',
       
    },
    media:window.innerWidth<=460?{
        width:'90%',
        marginLeft:'5%'
    }:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
        marginTop:'5%',
        justifyContent:'space-evenly',
        marginBottom:'8%'
    },
    img:window.innerWidth<=460? {
        width:'20%',
        display:'inline',
        marginLeft:'10%'
    }:{
        width:'30%',
        
        
    }
}
