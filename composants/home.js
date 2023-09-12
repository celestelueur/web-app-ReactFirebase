//home
import './home.css'
import './order.css'
import './about.css'
import './../client/auth.css'
//import trackPathForAnalytics from './ga4.ts'
import bttt from '../imgs/bttt.png'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import igicon from '../imgs/tt.png'
import waicon from '../imgs/whatsapp.png'
import shareicon from '../imgs/share.png'
import fbicon from '../imgs/fb.png'
import likeicon from '../imgs/comme.png'
import { useEffect, useCallback, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'

import { toast } from 'react-toastify'
const Home=()=>{
    const innWidth=window.innerWidth
    const fs=ex[3]
    const [data, setData]=useState({})

    //_____________-google analytic_________________________
   /* const { pathname, searchUser } = useLocation();

    const analytics = useCallback(() => {
        trackPathForAnalytics({ path: pathname, search: searchUser, title: pathname.split("/")[1] });
    }, [pathname, searchUser]);
	
    useEffect(() => {
        analytics();
    }, [analytics]);
    //______________end of google analytics___________________
*/


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

    /*
    useEffect(()=>{
        fb.child('offers').on('value', (snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()})
            } else{
                setData({})
            }
        })

        return ()=>{
            setData({})
        }
    }, []) */

    const onDelete=x=>{
        if(window.confirm('sure to delete?')){
            fs.firestore().collection('offers').doc(x).delete()
            .then(()=>toast.success('offre supprimée'))
            .catch((err)=>toast.error(err))
           // fs.child(`offers/${id}`).remove((err)=>{
            //    err? toast.error(err):toast.success('offre supprimée')
           // })
        }
    }

    const postDelete=x=>{
        if(window.confirm('sure to delete?')){
            fs.firestore().collection('posts').doc(x).delete()
            .then(()=>toast.success('article supprimée'))
            .catch((err)=>toast.error(err))
           
        }
    }
    


    const [offers, setOffers]=useState([])
   
    const dbRef=fs.firestore().collection('offers')//.orderBy('timestamp', 'desc')
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

    useEffect(()=>{
        const go=async()=>{
        dbRef.onSnapshot(
            querySnapshot=>{
                const offer=[]
                querySnapshot.forEach((doc)=>{
                    const {offername, price, description, category, arr}=doc.data()
                    offer.push({
                        id:doc.id,
                        offername,
                        price,
                        description,
                        category,
                        arr
            
                    })
                })
                setOffers(offer)
            }
        )

        }
        go()

   }, [dbRef])

   let lik=Object.keys(offers).reverse()
   let bl=Object.keys(blogs)

   const currentUrl=window.location.href

   const [cool, setCool]=useState()
   const [o, setO]=useState(false)
   const onOpen=e=>{
   /* Object.keys(blogs).map((i, v)=>{
        
        if(blogs[i].id.includes(e)){
             document.querySelector('.share-icons').classList.toggle('showShare')
        }
    })
    */
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
                    <div className='action'>
                        <button><Link to='/publier' style={{textDecoration:'none', color:'darkorange'}}>publier</Link></button>
                        <button><Link to='/post' style={{textDecoration:'none', color:'darkorange'}}>écrire</Link></button>
                    </div>
                    <br />
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Offres</p><br />
                    {
                        Object.keys(offers).reverse().map((id, index)=>{
                           // let el=offers[id]
                            if(lik.indexOf(id)<=2){
                               
                            return(
                                <div key={id} className='offercontent'>
                                    <br />
                                    <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr[0]} alt='offerimg' style={{width:'80%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn' onClick={()=>onDelete(offers[id].id)}><img src={deleteicon} alt='del' style={{width:"60%"}} /></button>
                                   
                                        <button className='btn'><Link to={`/offrevue/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )}


                        })

                    }

                    <button className='more'><Link to='/offre' style={{textDecoration:'none', color:'darkorange'}}>voir les offres</Link></button>
                  <br /><br />

                        {
                             blogs.length>=1? <h1 style={{color:'#666', letterSpacing:'1px', textAlign:'center'}}>Blogs</h1>:''
                        }

                    {
                       
                        Object.keys(blogs).map((i, v)=>{
                            if(bl.indexOf(i)<=5){
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
                                            <Link style={{color:'#666', textDecoration:'none'}}><div onClick={()=>postDelete(blogs[i].id)}><img src={deleteicon} alt='pic' width="20%" /><p>effacer</p></div></Link>
                                           
                                            <Link style={{color:'#666', textDecoration:'none'}} to={`/blogview/${blogs[i].id}`}><div><img src={seeicon} alt='pic' width="20%" /><p>lire</p></div></Link>
                                           <Link style={{color:'#666', textDecoration:'none'}}> <div onClick={()=>onOpen(blogs[i].id)}>

                                                {
                                                cool? blogs[i].id===cool?
                                                    <div className='share-icons' style={o?{display:'none'}:{display:'flex'}} >
                                                        <FacebookShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={fbicon} width='50%' alt='icon' />
                                                        </FacebookShareButton>
                                                    <br />
                                                        <TwitterShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={igicon} width='50%' alt='icon' />
                                                        </TwitterShareButton>
                                                    <br />
                                                        <WhatsappShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={waicon} width='50%' alt='icon' />
                                                        </WhatsappShareButton>
                                                    
                                                    
                                                </div>:'':''

                                                }
                                                
                                                
                                                <img src={shareicon} alt='pic' width="20%" /><p>partager </p>
                                               
                                            </div> </Link> 


                                        </div>
                                                
                                        <hr style={{height:0, border:'1px solid #444'}} />
                                        <br />
                                    </div>
                                    
                                )

                            }

                        })

                    }

                  
                    {
                        blogs.length>=1?   <Link to='/blogs' style={{textDecoration:'none', color:'darkorange'}}><button className='more'>Tous les articles</button></Link>:''
                    }  

                    <br /><br />
                </div>



                    <br />
        </div>

        </div>
        )

    }
    else{
        return(
            <div className="screen">
            <h2 className='pagetitle'>accueil</h2>
            <div className="content">
                <h1 style={{color:'red'}}>COUCOU</h1>
             
                </div>
               
        </div>
        )
    }
 
}
export default Home
