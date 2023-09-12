//publier
import './home.css'
import ex from '../firebase'
import './order.css'
import './../client/auth.css'
import { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage'
import { letterSpacing } from '@mui/system'
import { arrayRemove, setLogLevel } from 'firebase/firestore'


const is={
    offername:'',
    description:'',
    price:'',
    category:'',
    
}
const fb=ex[0]
const fs=ex[3]
const store=ex[1]
const Publier=()=>{
    const [state, setState]=useState(is)
    const [offerPic, setOfferPic]=useState([])
    let {offername, description, price, category}=state
    const [xx, setXX]=useState(false)
    const [img, setImg]=useState([])
    //const [el, setEl]=useState()
    const [upload, setUp]=useState(false)
    const [arr, setArr]=useState()
   // const [myState, settate]=useState({})
    const handleoffer=e=>{
        const {name, value}=e.target   
        setState({...state, [name]:value})
    }
    

    const handleofferpic=e=>{
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

    const dbRef=fs.firestore().collection('offers')


    const postOffer=e=>{     
        e.preventDefault()
       
         if(!(!offername || !price || !description || !category)){
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
                              
                                let myState={offername, price, description, category, arr}
                                dbRef
                                .add(myState)
                                .then(()=>{                           
                                    document.querySelector('.success p').innerHTML='Offre publiée'
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
            //.then(()=>{
            /*    let myState={offername, price, description, category, img}
                dbRef
                .add(myState)
                .then(()=>{                           
                    document.querySelector('.success p').innerHTML='Offre publiée'
                    showsuccess()
                    setTimeout(remsuccess, 4000)
                    setXX(0)
                    setTimeout(()=>window.location.assign('/'), 2000)
                })
                .catch((err)=>{
                    document.querySelector('.err p').innerHTML=err
                    showerr()
                    setTimeout(remerr, 4000)
                    document.querySelector('.phonecontent').style.display='block'
                    document.querySelector('#loader').style.display='none'
                }) */

           // })

        
          }
 
 
         }
         else{
             document.querySelector('.err p').innerHTML='Oops, veuillez remplir tous les champs'
             showerr()
             setTimeout(remerr, 4000)
            
         }
 
 
     }
 

   




    /*

     const postOffer=e=>{
       
       e.preventDefault()
      
        if(!(!offername || !price || !description || !category)){
            document.querySelector('.phonecontent').style.display='none'
            document.querySelector('#loader').style.display='block'
            
          const storage=getStorage()
        
          if(offerPic){        
            const storeref=ref(storage, `images/${offerPic.name}`)
            uploadBytes(storeref, offerPic)
            
            .then(()=>{
                getDownloadURL(ref(storage, `images/${offerPic.name}`))
                .then((urls)=>{
                    const myState={offername, price, description, category, urls}                
                    dbRef
                    .add(myState)
                    .then(()=>{ 
                        document.querySelector('.success p').innerHTML='Offre publié'
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


               })
             
           })

       
         }


        }
        else{
            document.querySelector('.err p').innerHTML='Oops, veuillez remplir tous les champs'
            showerr()
            setTimeout(remerr, 4000)
           
        }


    }


    */




    return(
        <div className='screen'>
            <div id='loader'></div>
        <div className="phonecontent">
            <h3 style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Publier</h3>

            <form onSubmit={postOffer} encType='multipart/form-data' style={{marginTop:'4%', width:'90%', marginLeft:'5%', textAlign:'center'}} >
                <input type='text' value={offername || ""} onChange={handleoffer} className='inp' placeholder="nom de l'offre" name='offername' />
                <input type='text' value={description || ""} onChange={handleoffer} className='inp' placeholder="description de l'offre" name='description' />
                
                <input type='number' value={price || ""} onChange={handleoffer} className='inp' placeholder="prix de l'offre" name='price' />
                <label htmlFor="categorie">Catégorie:</label><br />
                    <input type='radio' id='contact' name='category' placeholder="categorie de l'offre" value='App Mobile' onChange={handleoffer} /><p style={{color:'darkorange'}}>Application Mobile</p><br />
                    <input type='radio' id='contact' name='category' placeholder="categorie de l'offre" value='Site Web' onChange={handleoffer} /><p style={{color:'darkorange'}}>Site Web</p><br />
                    <input type='radio' id='contact' name='category' placeholder="categorie de l'offre" value='Marketing Digital' onChange={handleoffer} /><p style={{color:'darkorange'}}>Marketing Digital</p><br />
                <input type='file' onChange={handleofferpic}  className='inp' name='img' multiple/><br />
                <button type='submit' id='subc' style={{background:'orangered', color:'white', border:'none', padding:'1%', width:'25%'}}>publier</button>
            </form>

        </div>
        <br />
        <br /><br />

            <div className='err'>
                <p></p>
            </div>

            <div className='success'>
                <p></p>
            </div>


        </div>
    )


}
export default Publier