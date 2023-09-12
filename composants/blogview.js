//blog view

import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import igicon from '../imgs/tt.png'
import ReactTimeAgo from "react-time-ago"
import waicon from '../imgs/whatsapp.png'
import shareicon from '../imgs/share.png'
import fbicon from '../imgs/fb.png'

import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'


const BlogView=()=>{
    const fs=ex[3]
    const {id}=useParams()

    let mm=id

    const ndDnRef=fs.firestore().collection('posts')

    
const [blogs, setBlog]=useState([])

useEffect(()=>{
    const go=async()=>{
        ndDnRef.onSnapshot(
            querySnapshot=>{
                const blog=[]
                querySnapshot.forEach((doc)=>{
                    const {postTxt, postTitle, time, arr}=doc.data()
                    blog.push({
                        id:doc.id,
                        postTxt,
                        postTitle,
                        time,
                        arr
                    })
                })
                setBlog(blog)
            }
        )
    }

    go()
}, [ndDnRef])


/*
    const [selectedTime, setSelectedTime]=useState(new Date())
    
    const onChangeTime=e=>setTime(e.target.value)
*/


    const LastSeen=()=>{
        TimeAgo.addLocale(fr)
        const timeAgo=new TimeAgo('fr-FR')
        for(let a of blogs){
            if(a.id===mm){
                
                        let x=a.time
                       // const inSec=new Date().getTime()
                        const min=timeAgo.format(a.time-60*1000)
                        return(
                            <div>
                                <p style={{color:'#666', textAlign:'center'}}>{min==='il y a 1 minute'? "A l'instant": min}</p>
                            </div>
                        )
            }
        }
        
            
        
        
    }




    // <input type="datetime-local" onChange={onChangeTime} min='2018-06-07T00:00' max={new Date()} />

    const postDelete=x=>{
        if(window.confirm('sure to delete?')){
            fs.firestore().collection('posts').doc(x).delete()
            .then(()=>{alert('article supprimée'); window.location.assign('/')})
            .catch((err)=>alert(err))
           // fs.child(`offers/${id}`).remove((err)=>{
            //    err? toast.error(err):toast.success('offre supprimée')
           // })
        }
    }
    

    for(let a of blogs){
        if(mm===a.id){
           
         
    return(
        <div className="phonecontent">
<div className="view">
        <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>{a.postTitle} </p><br />
        <p><img src={a.arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                
                                    <p style={{color:'#ddd', marginBottom:'4%', letterSpacing:'1px', width:'90%', wordWrap:'break-word', lineHeight:'160%', marginLeft:'5%'}}>{a.postTxt}</p><br /></div>
                                    <Link onClick={()=>window.history.back()}>
                        <button id='back'>retour</button>
                    </Link><br />

                    <LastSeen />

                                        <div className='stat'>
                                            <button>0 <br />Vues</button>
                                            <button>0 <br />J'aime</button>
                                            <button>0 <br />Commentaires</button>
                                        </div>


                                        <h2 style={{color:"#666", textAlign:'center'}}>Partager sur</h2>
                                        <div className='share-icons-view' >
                                                    <FacebookShareButton url={window.location.href}>
                                                        <img src={fbicon} width='26%' alt='icon' />
                                                    </FacebookShareButton> <br />

                                                    <TwitterShareButton url={window.location.href}>
                                                        <img src={igicon} width='26%' alt='icon' />
                                                    </TwitterShareButton>
                                                    <br />

                                                    <WhatsappShareButton url={window.location.href}>
                                                        <img src={waicon} width='26%' alt='icon' />
                                                    </WhatsappShareButton>
                                                    
                                                    
                                        </div>
                                        <div className='actionBtn'>
                                            <Link style={{color:'#666', textDecoration:'none'}}><div onClick={()=>postDelete(a.id)}><img src={deleteicon} alt='pic' width="16%" /><p>effacer</p></div></Link>
                                                                           
                                           
                                        </div><br /> <br />
                                                

                   
        </div>
        
        
        
    )
        }}



}
export default BlogView


const mystyle={
    btn:{
      border:'none',
      width:'50%',
      padding:'3%',
      background:'-webkit-linear-gradient(darkorange, orangered)',
      color:'white',
      borderRadius:'20px 20px',
      marginLeft:'25%',
      letterSpacing:'1px',
      marginBottom:'8%'
    }
  }