import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from "../../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from '../../../layout/forms/ImageUpload';
import axios from "axios";
import { useNavigate, useParams  } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../layout/nav/Sidebar";

const AdsEdit = ({ action, type }) => {

      const [ads, setAds] = useState({
            _id: "",
            title: "",
            description: "",
            price: "",
            photos: [],
            address: "",
            uploading: false,
            loading: false,
            area: "",
            bedrooms: "",
            washrooms: "",
            carPark: "",
            type,
            action
      });
      const [loaded, setLoaded] = useState(false);

      const navigate = useNavigate();
      const params = useParams();

      useEffect(()=>{
          if(params?.slug) {
              fetchAd();
              //console.log("Slug =>" , params?.slug);
          }
      },[params?.slug]);

      const fetchAd = async () => {
            try {
                  const {data} = await axios.get(`/ad/${params.slug}`);  
                  setAds(data?.ad);
                  setLoaded(true);
                  //console.log("single ad data", data);
            } catch (error) {
                  console.log(error);
            }
      }

      const adsHandler = async () => {
            try {
                  // validations 
                  if(!ads.photos?.length){
                        toast.error("Photo is required");
                        return;
                  } else if(!ads.price) {
                        toast.error("Price is required");
                        return;
                  } else if(!ads.title) {
                        toast.error("Title is required");
                        return;
                  } else if(!ads.description) {
                        toast.error("Description is required");
                        return;
                  }else {
                        // make API put request
                        setAds({ ...ads, loading: true });
                        const { data } = await axios.put(`/ad/${ads._id}`, ads);
                        console.log("Ads updated response => ", data);
                        if (data?.error) {
                              toast.error(data.error);
                              setAds({ ...ads, loading: false });
                        } else {
                              toast.success("Ads updated successfully!");
                              setAds({ ...ads, loading: false });
                              navigate("/dashboard");
                        }
                  }                 
            } catch (err) {
                  console.log(err);
                  setAds({ ...ads, loading: false });
            }
      }

      return (
            <div>
            <h5 className="display-4 bg-secondary text-light"> Update Ad </h5>
            <div className="d-flex justify-content align-items-center">
              <Sidebar />
            <div className='adform ml-5'>
                  <div className="mb-3">
                        <ImageUpload ads={ads} setAds={setAds} />
                        {loaded ? (
                              <GooglePlacesAutocomplete
                                    apiKey={GOOGLE_PLACES_API_KEY}
                                    apiOptions="pk"
                                    selectProps={{
                                          defaultInputValue: ads?.address,
                                          placeholder: "Search for address..",
                                          onChange: ({ value }) => {
                                                setAds({ ...ads, address: value.description })
                                          },
                                    }}
                        /> ) : ("" )}

                  </div>
                  <input type='text'
                        className='input-container mb-3'
                        placeholder='Enter Title'
                        value={ads.title}
                        onChange={(e) => setAds({ ...ads, title: e.target.value })}
                  />
                  <textarea
                        className='input-container mb-3'
                        placeholder='Enter Description'
                        value={ads.description}
                        onChange={(e) => setAds({ ...ads, description: e.target.value })}
                  />
                  {loaded ? (<CurrencyInput
                        placeholder="Enter Price..."
                        defaultValue={ads.price}
                        className="input-container mb-3"
                        onValueChange={(value) => setAds({ ...ads, price: value })}
                  /> ) : ( "" ) }
                  {ads.type === "House" ? (
                        <>
                               <input type='number' min="0"
                        className='input-container mb-3'
                        placeholder='Enter how many bedrooms'
                        value={ads.bedrooms}
                        onChange={(e) => setAds({ ...ads, bedrooms: e.target.value })}
                  />
                  <input type='number' min="0"
                        className='input-container mb-3'
                        placeholder='Enter how many washrooms'
                        value={ads.washrooms}
                        onChange={(e) => setAds({ ...ads, washrooms: e.target.value })}
                  />
                  <input type='text'
                        className='input-container mb-3'
                        placeholder='Enter Car Parking Yes/No'
                        value={ads.carPark}
                        onChange={(e) => setAds({ ...ads, carPark: e.target.value })}
                  />
                        </>
                  ) : (
                        ""
                  )}
                  <input type='text'
                        className='input-container mb-3'
                        placeholder='Enter House Area'
                        value={ads.area}
                        onChange={(e) => setAds({ ...ads, area: e.target.value })}
                  />
                  <button onClick={adsHandler}
                        className="send">
                        <span>{ads.loading ? "Updating..." : "Update"} </span>
                        <div class="top"></div>
                        <div class="left"></div>
                        <div class="bottom"></div>
                        <div class="right"></div>
                  </button>
            </div>
            </div>
    </div> 
      )
}

export default AdsEdit
