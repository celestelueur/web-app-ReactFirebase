//messages
import './home.css'
import './order.css'
import './about.css'
import ex from '../firebase'
import deleteicon from '../imgs/withdraw.png'
import seeicon from '../imgs/view.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Message=()=>{
    const innWidth=window.innerWidth
    const [fb, store, auth]=ex
    const [data, setData]=useState({})

    useEffect(()=>{
        fb.child('messages').on('value', (snapshot)=>{
            if(snapshot.val()!==null){
                setData({...snapshot.val()})
            } else{
                setData({})
            }
        })

        return ()=>{
            setData({})
        }
    }, [])

    const onDelete=id=>{
        if(window.confirm('voulez-vous vriment effacer?')){
            fb.child(`messages/${id}`).remove((err)=>{
                err? alert(err):alert('message supprimé')
            })
        }
    }


    let lik=Object.keys(data).reverse()

    if(innWidth<=460){

        return(
            <div>
               
                
                <div className="screen">

                <div className="phonecontent">
                    <br />
                    <hr style={{border:'none', boxShadow:'0 1px 4px darkorange', height:'0.5px'}}/>
                    <p style={{color:'darkorange', textAlign:'center', letterSpacing:'2px', fontWeight:'600', fontSize:'80%'}}>Messages</p><br />
                    {
                        Object.keys(data).reverse().map((id, index)=>{
                          
                            return(
                                <div key={id} style={mystyle.div}>
                                    <br />
                                    <p style={mystyle.txt}>{data[id].msg}</p>
                                    <p style={mystyle.sender}><sub>{data[id].name.toUpperCase()}</sub></p>
                                   
                                    <p style={mystyle.sender}><sub>{data[id].num} </sub></p>
                                  
                                    <p style={mystyle.sender}><sub style={{color:'darkmagenta', fontSize:'80%'}}>{data[id].date}</sub> </p>
                                    <section>
                                        <button className='btn' style={{marginLeft:'40%'}} onClick={()=>onDelete(id)} ><img src={deleteicon} alt='del' style={{width:"60%"}} /></button>
                                       

                                    </section>
                                </div>
                            )
                            })


                    }
                    

            </div>
            </div>
            
                    </div>

        )
                    
                    

                


    }







}

export default Message

const mystyle={
    div:{
        marginLeft:'1%',
        width:'80%',
        marginTop:'5%',
        background:'-webkit-linear-gradient(top right, black, black)',
        boxShadow:'0 3px 5px darkorange',
        borderRadius:'0px 40px 40px 40px',
        maxHeight:'150%',
        overflow:'auto',
        wordWrap:'break-word'
    },
    txt:{
        color:'white',
        fontSize:'90%'
    },
    sender:{
        color:'darkgrey',
        fontSize:'80%',
        display:'inline',
        marginLeft:'3%',
        top:'1%'
    }
}

