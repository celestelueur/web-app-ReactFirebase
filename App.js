//import All from './all-in';
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import Publier from './composants/publier';
import {Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';
import Offre from './composants/offre';
import Login from './client/adm';
import OffreVue from './composants/offrevue';
import ClientHeader from './client/clientheader';
import Store from './client/store';
import MobileView from './composants/mobileview';
import BlogView from './composants/blogview';
import Order from './composants/order';
import Home from './composants/home';
import WebApp from './composants/web';
import ClientHome from './client/clienthome';
import Mobile from './composants/mobile';
import Contact from './client/contactus';
import Buy from './composants/buy';
import UserBlog from './client/userblog';
import ClientOffer from './client/clientoffer';
import UserBlogView from './client/userblogview';
import Marketing from './composants/marketing';
import Ori from './client/ori';
import Post from './composants/post';
import ClientOfferView from './client/clientofferview';
import Blog from './composants/blog';
import MarketingView from './composants/marketingview';
import Tarif from './client/tarif';
import Auth from './client/auth';
import WebAppView from './composants/webappview';
import Commande from './composants/commande';
import Message from './composants/message';
import Header from './composants/header';
function App() {

  const innWidth=window.innerWidth  
  const [authAdmin, setAuthAdmin]=useState(false)
  const auth=getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth, (authenticated)=>{
      authenticated.email? setAuthAdmin(true):setAuthAdmin(false)

    })
  }, [authAdmin, auth])


  
  if(authAdmin){
    return(
      <div className="App">
       <div className='bgimg'></div>
          
          <Header />
          <Routes>
          <Route exact path='/' element={<Home />}/>
            <Route path='/order' element={<Order />}/> 
            <Route path='/offrevue/:id' element={<OffreVue />} />
            <Route path='/blogview/:id' element={<BlogView />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/publier' element={<Publier />} />
            <Route path='/post' element={<Post />} />
            <Route path='/offre' element={<Offre />} />
            <Route path='/commande' element={<Commande />} />
            <Route path='/message' element={<Message />} />
          </Routes>
      
      </div>
    );
  }
  else{

    return(
      <div className="App">
        <div className='bgimg'></div>
          <ClientHeader />
          <Routes>
          <Route exact path='/' element={<ClientHome />}/>
           <Route path='/store' element={<Store />}/> 
            <Route path='/offerview/:id' element={<ClientOfferView />} />
            <Route path='/tarif' element={<Tarif />} />
            <Route path='/auth' element={<Auth/>} />
            <Route path='/offer' element={<ClientOffer />} />
            <Route path='/webappview/:id' element={<WebAppView />} />
            <Route path='/blogviews/:id' element={<UserBlogView/>} />
            <Route path='/az' element={<Login />} />
            <Route path='/buy/:id' element={<Buy />} />
            <Route path='/blog' element={<UserBlog />} />
            <Route path='/marketing' element={<Marketing />} />
            <Route path='/marketingview/:id' element={<MarketingView />} />
            <Route path='/mobile' element={<Mobile />} />
            <Route path='/webapp' element={<WebApp />} />
            <Route path='/ori' element={<Ori />} />
            <Route path='/mobileview/:id' element={<MobileView />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
      
      </div>
    )

  }
}



export default App;
