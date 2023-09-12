//blog, user version
//blogs
import '../composants/home.css'
import '../composants/order.css'
import '../composants/about.css'
import './auth.css'
//import trackPathForAnalytics from './ga4.ts'
import bttt from '../imgs/bttt.png'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import igicon from '../imgs/tt.png'
import waicon from '../imgs/whatsapp.png'
import tticon from '../imgs/tt.png'
import shareicon from '../imgs/share.png'
import likeicon from '../imgs/like.png'
//import shareicon from '../imgs/share.png'
import fbicon from '../imgs/fb.png'
//import likeicon from '../imgs/comme.png'
import { useEffect, useCallback, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'


const UserBlog=()=>{

    const innWidth=window.innerWidth
    const fs=ex[3]

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


    const postDelete=x=>{
        if(window.confirm('sure to delete?')){
            fs.firestore().collection('posts').doc(x).delete()
            .then(()=>alert('article supprimée'))
            .catch((err)=>alert(err))
           
        }
    }
    

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


    let bl=Object.keys(blogs)

    const currentUrl=window.location.href
 
    const [cool, setCool]=useState()
    const [o, setO]=useState(false)
    const onOpen=e=>{
        setCool(e)
        setO(!o)
        document.querySelector('.share-icons').classList.toggle('showShare')
    }
 
    TimeAgo.addLocale(fr)
    const timeAgo=new TimeAgo('fr-FR')


    if(innWidth<=480){
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
                   
                        {
                             blogs.length>=1? <h1 style={{color:'#666', letterSpacing:'1px', textAlign:'center'}}>Blogs</h1>:<p>Aucun article pour l'instant</p>
                        }

                    {
                       
                        Object.keys(blogs).map((i, v)=>{
                           
                                return(
                                    <div key={i} className='blog'>
                                        <p style={{color:'#666', fontSize:'80%', textAlign:'center'}}>
                                            {
                                                  timeAgo.format(blogs[i].time-60*1000)==='il y a 1 minute'? "A l'instant":timeAgo.format(blogs[i].time-60*1000)

                                            }

                                        </p>
                                        <div className='bloghead'>
                                        <img src={blogs[i].arr} alt='pic' width="60%" /><p style={{color:'#666'}}>{blogs[i].postTitle} </p>
                                        </div><br />
                                       
                                        <div className='actionBtn'>
                                            <Link style={{color:'#666', textDecoration:'none'}}><div><img src={likeicon} alt='pic' width="20%" /><p>j'aime</p></div></Link>
                                           
                                            <Link style={{color:'#666', textDecoration:'none'}} to={`/blogviews/${blogs[i].id}`}><div><img src={seeicon} alt='pic' width="20%" /><p>lire</p></div></Link>
                                           <Link style={{color:'#666', textDecoration:'none'}}> <div onClick={()=>onOpen(blogs[i].id)}>

                                                {
                                                cool? blogs[i].id===cool?
                                                    <div className='share-icons' style={o?{display:'none'}:{display:'flex'}} >
                                                        <FacebookShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={fbicon} width='50%' alt='icon' />
                                                        </FacebookShareButton>
                                                    <br />
                                                        <TwitterShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={tticon} width='50%' alt='icon' />
                                                        </TwitterShareButton>
                                                    <br />
                                                        <WhatsappShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={waicon} width='50%' alt='icon' />
                                                        </WhatsappShareButton>
                                                    
                                                    
                                                </div>:'':''

                                                }
                                                
                                                
                                                <img src={shareicon} alt='pic' width="20%" /><p>partager</p>
                                               
                                            </div> </Link> 


                                        </div>
                                       
                                       <hr style={{height:0, border:'1px solid #444'}} />
                                        <br />
                                    </div>
                                )

                            

                        })

                    }

                  
                    

                    <br /><br />
                </div>



                    <br />
        </div>

        </div>
        )

    }


    else{





    }


    
}

export default UserBlog