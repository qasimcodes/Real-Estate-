import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from './ImageUpload';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdsForm = ({ action, type }) => {

      const [ads, setAds] = useState({
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

      const navigate = useNavigate();

      const adsHandler = async () => {
            try {
                  setAds({ ...ads, loading: true });
                  const { data } = await axios.post("/ads-create", ads);
                  console.log("Ads create response => ", data);
                  if (data?.error) {
                        toast.error(data.error);
                        setAds({ ...ads, loading: false });
                  } else {
                        toast.success("Ads created successfully!");
                        setAds({ ...ads, loading: false });
                        navigate("/dashboard");
                  }
            } catch (err) {
                  console.log(err);
                  setAds({ ...ads, loading: false });
            }
      }

      return (
            <div className='adform'>
                  <div className="mb-3">
                        <ImageUpload ads={ads} setAds={setAds} />
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
                        />

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
                  <CurrencyInput
                        placeholder="Enter Price..."
                        defaultValue={ads.price}
                        className="input-container mb-3"
                        onValueChange={(value) => setAds({ ...ads, price: value })}
                  />
                  {type === "House" ? (
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
                        <span>{ads.loading ? "Saving..." : "Send"} </span>
                        <div class="top"></div>
                        <div class="left"></div>
                        <div class="bottom"></div>
                        <div class="right"></div>
                  </button>

                  {/* <pre style={{color: "white"}}>{JSON.stringify(ads, null, 4)}</pre> */}


            </div>
      )
}

export default AdsForm
