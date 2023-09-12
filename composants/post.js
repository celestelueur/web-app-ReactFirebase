//post
import ex from '../firebase'
import { useEffect, useState } from 'react'
import TimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr.json'
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage'

const is={
    postTxt:'',
    postTitle:''
}
const Post=()=>{
    const fb=ex[0]
    const fs=ex[3]
    const store=ex[1]
    TimeAgo.addDefaultLocale(fr)
    

    const [state, setState]=useState(is)
    const [offerPic, setOfferPic]=useState([])
    let {postTxt, postTitle}=state

    const handlepost=e=>{
        const {name, value}=e.target   
        setState({...state, [name]:value})
    }
    

    const handlepic=e=>{
        setOfferPic(e.target.files)

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

    const dbRef=fs.firestore().collection('posts')


    const go=e=>{
        e.preventDefault()

        if(postTitle==="" || postTxt===""){
            document.querySelector('.err p').innerHTML='Oops, veuillez remplir tous les champs'
             showerr()
             setTimeout(remerr, 4000)
        }
        else{

            document.querySelector('.phonecontent').style.display='none'
             document.querySelector('#loader').style.display='block'
                                
           const storage=getStorage()
          
         let arr=[]
         if(offerPic){ 
           
          let x=0;
            [...offerPic].map((one)=>{             
                const storeref=ref(storage, `images/${one.name}`)
                uploadBytes(storeref, one)
                .then(()=>{              
                  getDownloadURL(ref(storage, `images/${one.name}`))
                   .then((urls)=>{
                   x++                 
                   arr=[...arr, urls]                  
                        if(x===([...offerPic].length)){
                                const time=new Date().getTime()
                                let myState={postTxt, postTitle, time, arr}
                                dbRef
                                .add(myState)
                                .then(()=>{                           
                                    document.querySelector('.success p').innerHTML='Blog publiée'
                                    showsuccess()
                                    setTimeout(remsuccess, 4000)
                                    setTimeout(()=>window.location.assign('/'), 2000)
                                })
                                .catch((err)=>{
                                    document.querySelector('.err p').innerHTML=err
                                    showerr()
                                    setTimeout(remerr, 4000)
                                    document.querySelector('.phonecontent').style.display='block'
                                    document.querySelector('#loader').style.display='none'
                                })
                           }
                       // }
                    
                    
                     //   er()
                   })
                    


                   
                })
                    
                

            })

          }
 
 

        }

    }

    return(
        <div className='screen'>
            <div id='loader'></div>
        <div className="phonecontent">
            
            <h1 style={{color:'darkorange', marginLeft:'5%'}}>Publier un blog</h1>

            <form onSubmit={go} style={styles.form}>
                <textarea style={styles.txtarea} value={postTxt || ""} name='postTxt' onChange={handlepost} /><br /><br />
                <input type="text" value={postTitle || ""} name='postTitle' placeholder="titre de la publication" onChange={handlepost} style={styles.txttitle} /><br /><br />
                <input type='file'className='inp' onChange={handlepic} name='img' /><br /><br />
              
                <button type="submit" style={styles.btn}>publier</button>
            </form>


            <div className='err'>
                <p></p>
            </div>

            <div className='success'>
                <p></p>
            </div>
        </div>
        </div>


    )



}
export default Post

const styles={
    form:{
        display:'flex',
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-evenly', 
        alignItems:'center'
    },

    txtarea:{
        width:'80%',
        padding:'5%',
        wordWrap:'break-word',
        overflow:'auto'
    },
    txttitle:{
        width:'80%',
        padding:'2%'
    },
    btn:{
        width:'50%',
        padding:'4%',
        color:'white',
        fontSize:'100%',
        border:'none',
        borderRadius:'10px 10px',
        background:'green'
    }
}

