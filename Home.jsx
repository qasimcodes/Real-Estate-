import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/auth'
import axios from "axios"
import AdsCard from "../layout/card/AdsCard";

const Home = () => {
    /* Context */
    const [auth, setAuth] = useAuth();
    /* states */
    const [adsForSell, setAdsForSell] = useState();
    const [adsForRent, setAdsForRent] = useState();

   /* useEffect hook */
   useEffect(()=>{
        fetchAds();
   },[])   

   const fetchAds = async () => {
         try {
           const {data} = await axios.get("/ads"); 
           setAdsForSell(data.adsForSell);
           setAdsForRent(data.adsForRent);
         } catch(err){    
               console.log(err);
         }
   } 

  return (
    <div> 
        <h5 className="display-4 bg-secondary text-light"> For Sale</h5>
        <div className="container">
           <div className="row">
                {adsForSell?.map((ad) => 
                   <AdsCard ad={ad} />
                )}
           </div>
           <br />
        </div>
        <br />
        <h5 className="display-4 bg-secondary text-light"> For Rent</h5>
        <div className="container">
           <div className="row">
                {adsForRent?.map((ad) => 
                   <AdsCard ad={ad} />
                )}
           </div>
        </div>
        <br />
    </div>
  )
}

export default Home
