//buy
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../composants/home.css'
import '../composants/order.css'

import ex from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import DOMPurify from "dompurify"
const fs=ex[3]
const fb=ex[0]
const Buy=()=>{
    //const [offer, setOffer]=useState({})
    const [currentId, setCurrentId]=useState('')
    const [inputs, setInput]=useState({})
    const {id}=useParams()
    const [err, setErr]=useState('')
    const [success, setSuccess]=useState('')
    //here below goes the function meant to retrieve current offer from the offers database
    /*
    useEffect(()=>{
        fb
        .child(`offers/${id}`)
        .get()
        .then((snapshot)=>{
            snapshot.exists()? setOffer({...snapshot.val()}): setOffer({})
        })
    }, [id])
    console.log("offer", offer)
    */


    //the function below checks whether the current user is signed in, otherwise, he's prompted to the signing page
    useEffect(()=>{
        const auth=getAuth()
        onAuthStateChanged(auth, (x)=>{
            if(!x){
                window.location.assign('/')
            }
        })
    })

    
let mm=id



const [offers, setOffers]=useState([])
//const [offers, setOffers]=useState([])
   
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

}, [])

const [user, setUser]=useState([])
useEffect(()=>{
    if(offers.length>0){
        for(let a of offers){
            if(a.id===id){
                setUser(a)
            }
        }
    }
   })
    


    //this one below retrieve the values from the input fields
    const handleCustomer=e=>{
        const name=e.target.name
        const value=e.target.value
        setInput(values=>({...values,[name]:value}))

    }

    //error and success message handler
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
    //

    
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

    //get the current user id to identify who orders the offer
   let us=getAuth()
   useEffect(()=>{
    onAuthStateChanged(us, (auth)=>{
        if(auth) setCurrentId(auth.uid)
    })
   })
    const all={
        id:currentId,
        acheteur:inputs.customername,
        mail:inputs.customeradress,
        numero:inputs.customernumber,
        nom:user? user.offername:'',
        prix:user? user.price:'',
        des:inputs.detail,
        image:user? user.arr:'',
        time:getTime()
    }
    const not={
        msg:'nouvelle commande de '+all.acheteur
    }

    //the function below submits the order
    const order=e=>{
        e.preventDefault()
        if(!inputs.customername || !inputs.customeradress || !inputs.customernumber){
            setErr('Oops, veuillez remplir tous les champs')
            showerr()
            setTimeout(remerr, 4000)
        }
        else if(inputs.customername.length<3){
            setErr('Oops, Nom saisi trop court')
            showerr()
            setTimeout(remerr, 4000)
        }
        else if(inputs.customernumber.length<10){
            setErr('Oops, Numéro entré incomplet, au moins 10 chiffres')
            showerr()
            setTimeout(remerr, 4000)
        }
        else{
            if(id){
                
            fb.child(`users/${currentId}`).push(all, (err)=>{
                if(err){
                    alert(err)
                }
                else{
                    setSuccess('Offre commandé avec succès')
                    showsuccess()
                    setTimeout(remsuccess, 4000)
                }
                fb.child('orders').push(all, (error)=>error)
                fb.child('notification').push(not, (error)=>error)
                setTimeout(()=>window.location.assign('/'), 2000)
            })


        }
        else{  setErr('Oops, vous devez vous connecter pour finaliser cette commande')
        showerr()
        setTimeout(remerr, 4000)
        setTimeout(()=>window.location.assign('/'), 1000)
        }
    
    }

    }


    for(let a of offers){
        if(mm===a.id){
    return(
        <div>
             <div style={window.innerWidth<=460?{marginTop:'22.5%', marginBottom:'12%'}:{marginTop:'15.5%'}}>
                <div>
                    <h3 style={{textAlign:'center', fontSize:"120%", color:'darkorange'}}>Vous commandez l'article ci-dessous</h3>
                    <img src={a.arr} style={{width:'40%', height:'30%', marginLeft:'30%'}} alt='se' />
                    <p style={{textAlign:'center', color:'darkorange'}}>Nom de l'offre: <b>{a.offername}</b></p>
                    <p style={{textAlign:'center', color:'darkorange'}}>Prix de l'offre: <b>{a.price}$ US</b></p>
                    
                </div><br />
                <h3 style={{textAlign:'center', color:'darkorange'}}>Veuillez remplir ces champs</h3>
                <form onSubmit={order} encType='multipart/form-data'>
                    <input type='name'className="inp" name='customername' value={inputs.customername || ""} placeholder='votre nom' onChange={handleCustomer} /><br />
                    <input type='mail' className="inp" name='customeradress' value={inputs.customeradress || ""} placeholder='votre adresse' onChange={handleCustomer} /><br />
                    <input type='number' className="inp" name='customernumber' value={inputs.customernumber ||""} placeholder='votre numero' onChange={handleCustomer} /><br />
                    <textarea className="inp" name="detail" value={inputs.detail || ""} placeholder="Décrire en une phrase ce que vous désirez" onChange={handleCustomer} />
                    <br />
                    <input type='checkbox' id='checker' style={{marginLeft:'49%'}} required/><p style={{textAlign:'center', color:'orangered', fontSize:'90%'}}>*J'affirme avoir lu les règles de confidentialité et les clauses liées aux commandes sur Altokudos, sinon cliquez-ici*</p><br />
                   
                    <button type="submit" id='order' style={mystyle.btn}>je commande</button>
                </form>
            </div>



            <div className='err'>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(err)}}></p>
            </div>

            <div className='success'>
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(success)}}></p>
            </div>
        <br />
        </div>

    )
    }}

}
export default Buy
const mystyle={
   /* btn:{
        width:'30%',
        marginLeft:'35%',
        background:'green',
        border:'none',
        color:'white',
        letterSpacing:'2px',
        padding:'1%',
        textAlign:'center'
    },*/
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