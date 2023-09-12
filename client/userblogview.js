
import ex from "../firebase"
import commentIcon from '../imgs/comment.png'
import commentIcHide from '../imgs/hide.png'
import likeicon from '../imgs/like.png'
import likedIcon from '../imgs/liked.png'
import { useEffect, useState } from "react"
import {Link, useParams} from 'react-router-dom'
import deleteicon from '../imgs/delete.png'
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import igicon from '../imgs/tt.png'
import waicon from '../imgs/whatsapp.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import sendIcon from '../imgs/email_send.png'
import fbicon from '../imgs/fb.png'
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'

const initialState={
    userComment:'',
    userName:''
}
const UserBlogView=()=>{

    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')
    const fs=ex[3]
    const {id}=useParams()
    const [openComment, setOpenComment]=useState(false)
    const [seeComment, setSeeComment]=useState(false)
    const [like, setLike]=useState(true)
    const [likePic, setLikePic]=useState([])
    const [currentId, setCurrentId]=useState()
    let mm=id

    const [state, setState]=useState(initialState)
    const {userComment, userName}=state

    const handlecomment=e=>{
        const {name, value}=e.target   
        setState({...state, [name]:value})
    }

    const ndDnRef=fs.firestore().collection('posts')
    
const [blogs, setBlog]=useState([])

useEffect(()=>{
    const go=async()=>{
        ndDnRef.onSnapshot(
            querySnapshot=>{
                const blog=[]
                querySnapshot.forEach((doc)=>{
                    const {postTxt, postTitle, time, arr, comments, likes}=doc.data()
                    blog.push({
                        id:doc.id,
                        postTxt,
                        postTitle,
                        time,
                        arr,
                        comments,
                        likes
                    })
                })
                setBlog(blog)
            }
        )
    }

    go()
}, [ndDnRef])

const [avail, setAvail]=useState([])
const [likeCount, setLikeCount]=useState([])
//time ago component: meant to display the time elapsed since one data has been published
const LastSeen=()=>{
    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')
    for(let a of blogs){
        if(a.id===mm){
                    if(a.comments){
                         setAvail(a.comments)
                    }
                    if(a.likes){
                        setLikeCount(a.likes)
                       
                    } 
                    
            
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

useEffect(()=>{
    for(let a of blogs){
        if(a.id===mm){
            if(a.likes)
            a.likes.map((x)=>{
                if(x.currentId===currentId && x.like){
                 return setLikePic([...likePic, x.currentId])
                 
                }
               
            
              })
        }
    }

  

   // likePic.length>0? document.querySelector('#id').src=likedIcon:document.querySelector('#id').src=likeicon
}, [blogs, currentId, likePic, mm])


let us=getAuth()
       useEffect(()=>{
        onAuthStateChanged(us, (auth)=>{
            if(auth) setCurrentId(auth.uid)
        })
       })

const commentSubmit=e=>{
    e.preventDefault()
    if(userName.length<=3){
        document.querySelector('#err').style.display='block'
        setTimeout(()=>document.querySelector('#err').style.display='none', 1000)
        //alert('Nom trop court')
    }

    else{
        const commentTime=new Date().getTime()
        const myState={userName, userComment, currentId, commentTime}
        
        ndDnRef.doc(id).update({comments:[...avail, myState]})
        .then(()=>{
            document.querySelector('.commentSection').classList.toggle('show')
            setOpenComment(!openComment)
            setState({})
        })
    }
}

/*
   {
                    a.likes?
                    a.likes.map((x)=>{ 
                        let arr=[]
                                            
                        if(x.currentId===currentId && x.like){
                            arr=[...arr, x.currentId]  
                            if(arr.includes(currentId)){
                            return(
                                <>
                                    <img src={likedIcon} alt="like" width="20%" />
                                    j'ai aimé
                                </>
                            )}
                            
                        }    
                       
                       
                    }): 
                    <>
                        <img src={likeicon} alt="like" width="20%" />
                                    j'aime
                    </>
                }      

*/


for(let a of blogs){
    if(mm===a.id){
        
        if(window.innerWidth<=460){
     
return(
    <div className="phonecontent">
<div className="view">
    <br /><br />
    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'120%'}}>{a.postTitle} </p><br />
    <p><img src={a.arr} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
            
                                <p style={{color:'#ddd', marginBottom:'4%', letterSpacing:'1px', width:'90%', wordWrap:'break-word', lineHeight:'160%', marginLeft:'5%'}}>{a.postTxt}</p><br /></div>
                                <Link onClick={()=>window.history.back()}>
                    <button id='back'>retour</button>
                </Link><br />

                <LastSeen />
                <div className="user-actions">
            <p onClick={()=>{document.querySelector('.commentSection').classList.toggle('show'); setOpenComment(!openComment)}}><img src={openComment? commentIcHide:commentIcon} alt='action' width='20%' /><br /> {openComment? 'fermer':'commenter'}</p>
            <p onClick={()=>{
            
                setLike(!like)  
                let el={currentId, like}
                
                a.likes?
                a.likes.map((x)=>{
                    if(x.currentId===currentId || x.like===false){
                        ndDnRef.doc(id).update({likes:a.likes.splice(a.likes.indexOf(x), 1)})
                        .then(()=>ndDnRef.doc(id).update({likes:[...a.likes]}))
                       /* .then(()=>{
                            if(a.likes.length<=0){
                                return ndDnRef.doc(id).update({likes:[]})
                            }
                        })  */
                    }
                    else{
                         ndDnRef.doc(id).update({likes:[...likeCount, el]})
                         //.then(()=>ndDnRef.doc(id).update({likes:[...a.likes]}))
                    }
                    
                })
                :ndDnRef.doc(id).update({likes:[...likeCount, el]}).then(()=>ndDnRef.doc(id).update({likes:[...a.likes]}))

            } }>

                {
                    a.likes?

                    likePic.length>0?
                    <>
                    <img id='pic' src={likedIcon} width="20%" alt='like' /><br />
                    j'ai aimé</>:
                    <>
                    <img id='pic' src={likeicon} width="20%" alt='like' /><br />
                    j'aime</>:<>
                    <img id='pic' src={likeicon} width="20%" alt='like' /><br />
                    j'aime</>

                }
                
              

            </p>
        </div>

                <div className="commentSection">
                    <div className="comments">
                        <img src={commentIcHide} onClick={()=>{document.querySelector('.commentSection').classList.toggle('show'); setOpenComment(!openComment)}} width='15%' style={{position:'fixed', bottom:0, left:0}} alt='icon' />
                        <form onSubmit={commentSubmit}>
                            <br />
                            <textarea placeholder="Ecrivez votre commentaire" value={userComment || ""} name="userComment" onChange={handlecomment} className="commentInput" required/><br />
                            <input type="text" style={{width:'60%', padding:'2%'}} value={userName || ""} name="userName" onChange={handlecomment} placeholder="votre nom complet" required /><br />
                            <p id="err" style={{color:"red", display:'none'}}>Nom trop court</p>
                            <button type="submit" className="commentSubmit"><img src={sendIcon} alt='sender' /></button><br />
                        </form>
                    </div>
                </div>

                                    <div className='stat'>
                                        <button>0 <br />Vues</button>
                                       
                                        <button>{a.likes? a.likes.length:0} <br />J'aime</button>
                                        <button>{a.comments? a.comments.length:0} <br />Commentaires</button>
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
                                   <br />

                                    {
                                        a.comments?
                                        a.comments.length>0?  <button className="more" onClick={()=>{document.querySelector('.commentShow').classList.toggle('showComment'); setSeeComment(!seeComment)}}>{seeComment? 'cacher les commentaires':'voir les commentaires'}</button>
:''                          :''
                                    }
                                  
                                    <div className="commentShow">
                                        {
                                            a.comments?
                                            a.comments.map((c)=>{
                                              return( <div className={c.currentId===currentId? "selfCommentList":"commentList"}>
                                                 <p className="commentName">{c.currentId===currentId? 'Vous': c.userName}</p>
                                                <p style={{marginLeft:'2%', fontSize:'90%', lineHeight:'150%'}}>{c.userComment} </p>
                                                <p className="commentTime">{timeAgo.format(c.commentTime-60*1000)} </p>
                                                 {c.currentId===currentId? <button className="deleteComment" onClick={
                                                    
                                                    ()=>{

                                                        let em=[...a.comments]
                                                        let i=em.indexOf(c)
                                                        if(i!==-1){
                                                            ndDnRef.doc(a.id).update({comments:em.splice(i, 1)})
                                                            .then(()=> ndDnRef.doc(a.id).update({comments:[...em]}))
                                                        }
                                                    }
                                                    
                                                    }><img src={deleteicon} width='6%' alt="delete" /></button>:'' } 
                                                
                                                </div>)
                                            })
                                        :"" }
                                   
                                    </div>
                                   
                                    <br /><br />                                                 
    </div>
    
)}
    }}
}

export default UserBlogView
