//log


import { useState, useEffect } from "react"
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify"

const Login=()=>{
    const innwidth=window.innerWidth

    const [adminmail, setAdmin]=useState('')
    const [adminpwd, setAdminPwd]=useState('')
    const [adminid, setAdminId]=useState('')
    const handleAdminMail=e=>{
        setAdmin(e.target.value)
        
    }

    const handleAdminPwd=e=>{
        setAdminPwd(e.target.value)
    }
    const auth=getAuth()
    useEffect(()=>{
        
        onAuthStateChanged(auth, (authenticated)=>{
          if(authenticated.email) window.location.assign('/')
    
        })
      }, [auth])
    

    const setLogin=e=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, adminmail, adminpwd)
        .then((userCredential) => {
    // Signed in 
            const user = userCredential.user;
            toast.success('connecté')
            setAdminId(user.uid)
            localStorage.setItem('id', adminid)
            window.location.assign('/')
    // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            
            const errorMessage = error.message;
            toast.error(errorMessage)
        });

    }

    if(innwidth<=460){
        return(
            <div style={{marginTop:'24%'}}>
                <form onSubmit={setLogin}>
                    <input type='email' placeholder='adresse email' value={adminmail} onChange={handleAdminMail} /><br /><br />
                    <input type='text' placeholder="mot de passe" value={adminpwd} onChange={handleAdminPwd} /><br /><br />
                    <input type='submit' value='se connecter' />

                </form>
                
            </div>

        )


    }

}

export default Login




