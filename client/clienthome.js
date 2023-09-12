//client home

//client home
import '../composants/home.css'
import '../composants/order.css'
import '../composants/about.css'
import trackPathForAnalytics from '../composants/ga4.ts'
import bttt from '../imgs/bttt.png'
import ex from '../firebase'
import DOMPurify from 'dompurify'
import fb from '../imgs/facebook.png'
import ig from '../imgs/instagram.png'
import carticon from '../imgs/cart.png'
import tticon from '../imgs/tt.png'
import shareicon from '../imgs/share.png'
import likeicon from '../imgs/like.png'
import waicon from '../imgs/whatsapp.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import TimeAgo from "javascript-time-ago"
import fr from 'javascript-time-ago/locale/fr.json'
import { WhatsappShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
import { useEffect, useCallback, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const ClientHome=()=>{
    const innWidth=window.innerWidth
    const fs=ex[3]
    //const [data, setData]=useState({})
   // const [txt, setTxt]=useState(`digitalisez votre business et rendez-le célèbre avec altokudos`)
   
    //_____________-google analytic_________________________
    const { pathname, searchUser } = useLocation();

    const analytics = useCallback(() => {
        trackPathForAnalytics({ path: pathname, search: searchUser, title: pathname.split("/")[1] });
    }, [pathname, searchUser]);
	
    useEffect(() => {
        analytics();
    }, [analytics]);
    //______________end of google analytics___________________

    let calcScroll=()=>{
        let scrollProgress=document.querySelector('#progress')
        //let progressVal=document.querySelector('#progress-value') 
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

    //if a user isn't logged in, then he's prompted to the authenticaton page
    const authenticate=getAuth()
    useEffect(()=>{

        onAuthStateChanged(authenticate, (auth)=>{
            if(!auth){
                window.location.assign('/auth')
            }
        })
            
        })

    useEffect(()=>{
        setTimeout(()=>document.querySelector('#banner').style.display='block', 3000)
    })

    const [offers, setOffers]=useState([])
   
    const dbRef=fs.firestore().collection('offers')//.orderBy('timestamp', 'desc')
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

   let lik=Object.keys(offers).reverse()

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
                   
                    <p style={{color:'darkgrey', textAlign:'center', fontSize:'100%'}}>Accès Rapide</p>
                    <div style={mystyle.fast}>
                        <button style={mystyle.list}><Link to='/webapp' style={{textDecoration:'none', color:'white'}}>application web</Link></button>
                        <button style={mystyle.list}><Link to='/mobile' style={{textDecoration:'none', color:'white'}}>application mobile</Link></button>
                        <button style={mystyle.list}><Link to='/marketing' style={{textDecoration:'none', color:'white'}}>marketing digital</Link></button>
                    </div><br />
                    <br />
                    
                    <div className='banner'>
                        <br />
                        <h2>Faites le bon choix pour votre entreprise</h2>
                        <p>Obtenez votre application mobile professionnelle</p>
                        <p>Migrer vers le web en optant pour un site web</p>
                        <p>Rendez célèbre sur le web vos produits & services</p>
                        <p>Vous voulez plus d'abonnés ou plus de vues?</p><br />
                        <button><Link to='/store' style={{color:'white', textDecoration:'none', letterSpacing:'1px'}}>COMMENCER MAINTENANT</Link></button>
                    </div>

                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Offres</p>
                    {
                        Object.keys(offers).reverse().map((id, index)=>{
                            if(lik.indexOf(id)<=8){
                            return(
                                <div key={id} className='offercontent'>
                                    <br />
                                    <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr} alt='offerimg' style={{width:'100%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                        
                                        <button className='btn'><Link to={`/offerview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )}


                        })

                    }

                    <button className='more'><Link to='/offer' style={{textDecoration:'none', color:'darkorange'}}>voir les offres</Link></button>
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>

                    
                    
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
                                            <Link style={{color:'#666', textDecoration:'none'}}><div><img src={likeicon} alt='pic' width="20%" /><p>j'aime</p></div></Link>
                                           
                                            <Link style={{color:'#666', textDecoration:'none'}} to={`/blogviews/${blogs[i].id}`}><div><img src={seeicon} alt='pic' width="20%" /><p>lire</p></div></Link>
                                           <Link style={{color:'#666', textDecoration:'none'}}> <div onClick={()=>onOpen(blogs[i].id)}>

                                                {
                                                cool? blogs[i].id===cool?
                                                    <div className='share-icons' style={o?{display:'none'}:{display:'flex'}} >
                                                        <FacebookShareButton url={`${currentUrl}blogview/${blogs[i].id}`}>
                                                            <img src={fb} width='50%' alt='icon' />
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
                        blogs.length>=1?   <Link to='/blog' style={{textDecoration:'none', color:'darkorange'}}><button className='more'>Tous les articles</button></Link>:''
                    }  

                    <br />



                    <div style={mystyle.section}>
                        <button style={mystyle.el}><Link to='/contact' style={{textDecoration:'none', color:'white'}}>Nous contacter</Link></button>
                        <button style={mystyle.el}><Link to='/ori' style={{textDecoration:'none', color:'white'}}>Orientation</Link></button>
                        <button style={mystyle.el}><Link style={{textDecoration:'none', color:'white'}}>Règlements</Link></button>
                        <button style={mystyle.el}><Link to='/tarif' style={{textDecoration:'none', color:'white'}}>Tarifs</Link></button><br /><br />
                       
                    </div>

                </div>
                <br />
                <br />

        </div>

        </div>
        )

    }
    else{
        return(
            <div className="desktopcontent">
                   
                   <div id='progress'>
                        <span id='progress-value'>
                            <b><img src={bttt} alt='' style={{width:'100%'}} /></b>
                        </span>
                    </div>
                    <div style={mystyle.fast}>
                        <button style={mystyle.list}><Link to='/webapp' style={{textDecoration:'none', color:'white', fontSize:25}}>application web</Link></button>
                        <button style={mystyle.list}><Link to='/mobile' style={{textDecoration:'none', color:'white', fontSize:25}}>application mobile</Link></button>
                        <button style={mystyle.list}><Link to='/marketing' style={{textDecoration:'none', color:'white', fontSize:25}}>marketing digital</Link></button>
                    </div><br />
                    <br />
                    
                    <div className='dtbanner'>
                        <br />
                        <h2>Faites le bon choix pour votre entreprise</h2>
                        <p>Obtenez votre application mobile professionnelle</p>
                        <p>Migrer vers le web en optant pour un site web</p>
                        <p>Rendez célèbre sur le web vos produits & services</p>
                        <p>Vous voulez plus d'abonnés ou plus de vues?</p><br />
                        <button><Link to='/store' style={{color:'white', textDecoration:'none', letterSpacing:'1px'}}>COMMENCER MAINTENANT</Link></button>
                    </div>


                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'180%'}}>Offres</p>
                    {
                        Object.keys(offers).map((id, index)=>{
                            if(lik.indexOf(id)<=7){
                            return(
                                <div key={id} className='dtoffercontent'>
                                    <br />
                                    <p>{offers[id].offername.toUpperCase()}</p>
                                    <p><img src={offers[id].arr} alt='offerimg' style={{width:'100%', height:'10%',  borderRadius:'20px 20px'}} /></p>
                                   

                                    <section>
                                        <button className='btn'><Link to={`/buy/${offers[id].id}`}><img src={carticon} alt='addtocart' style={{width:"60%"}} /></Link></button>
                                        
                                        <button className='btn'><Link to={`/offerview/${offers[id].id}`}><img src={seeicon} alt='del' style={{width:"60%"}} /></Link></button>
                                    </section>
                                </div>
                            )}


                        })

                    }

                    <button className='dtmore'><Link to='/offer' style={{textDecoration:'none', color:'darkorange'}}>voir les offres</Link></button>
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <div style={mystyle.section}>
                        <button style={mystyle.el}><Link to='/contact' style={{textDecoration:'none', color:'white'}}>Nous contacter</Link></button>
                        <button style={mystyle.el}><Link to='/ori' style={{textDecoration:'none', color:'white'}}>Orientation</Link></button>
                        <button style={mystyle.el}><Link style={{textDecoration:'none', color:'white'}}>Règlements</Link></button>
                        <button style={mystyle.el}><Link to='/tarif' style={{textDecoration:'none', color:'white'}}>Tarifs</Link></button><br /><br />
                       
                    </div>

                    <p style={{color:'orangered', fontSize:'150%', textAlign:'center', fontWeight:'bold'}}>Réseaux Sociaux</p>
                    <div className='dtcontact'>
                        <a><img src={fb} alt="sm" /></a>
                        <a><img src={ig} alt="sm" /></a>
                    </div>
                    <br /><br /><br />
                </div>
        )

    }



}
export default ClientHome

const mystyle={
    fast:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
        
    },
    list:{
        //display:'inline',
        //width:'22%',
        wordWrap:'break-word',
        padding:'3%',
        whiteSPace:'no-wrap',
        //overflow:'hidden',
        textOverflow:'ellipsis',
        overflow:'auto',
        //border:'1px solid orangered',
        textAlign:'center',
        //marginLeft:'9%',
        color:'white',
        background:'-webkit-linear-gradient(rgba(255,140,0,0.8), rgba(255,69,0,0.8))',
        borderRadius:'20px 20px',
        border:'none'
      
    },
    section:{
        marginBottom:'10%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    el: window.innerWidth<=460? {
        color:'white',
        fontFamily:'Verdana, monospace',
        display:'block',
        marginTop:'5%',
        letterSpacing:'1px',
        fontSize:'100%',
        fontVariant:'small-caps',
        background:'-webkit-linear-gradient(rgba(255,140,0,0.8), rgba(255,69,0,0.8))',
        //borderRadius:'0px 20px 20px 0',
        //border:'2px solid orangered',
        textAlign:'center',
        padding:"2%",
        width:'62%',
        border:'none'
    }:{
        color:'white',
        fontFamily:'Verdana, monospace',
        display:'block',
        marginTop:'5%',
        letterSpacing:'2px',
        fontSize:'160%',
        boxShadow:'0 1px 5px black',
        fontVariant:'small-caps',
        background:'-webkit-linear-gradient(rgba(255,140,0,0.8), rgba(255,69,0,0.8))',
        //borderRadius:'0px 20px 20px 0',
        //border:'2px solid orangered',
        textAlign:'center',
        padding:"2%",
        width:'50%',
        border:'none'

    },
    foot:{
        color:'darkgrey',
        letterSpacing:'2px',
        textAlign:'center',
        fontWeight:'500',
        fontSize:'100%'
    },
    banner:{
        background:'-webkit-linear-gradient(left, darkorange, orangered)',
        color:'white',
       width:'90%',
       padding:'5%',
        letterSpacing:"2px",
        fontVariant:'small-caps',
        textAlign:'center'
    },

}
