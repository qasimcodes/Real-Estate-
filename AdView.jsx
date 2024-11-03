import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../../../layout/misc/ImageGallery"
import Default from "../../../images/Default_image.jpg";
import AdFeature from '../../../layout/card/AdFeature';
import { priceFormatter } from "../../../helpers/AdHelper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Wishlist from '../../../layout/misc/Wishlist';
import GoogleMapCard from '../../../layout/card/GoogleMapCard';
import HTMLRenderer from 'react-html-renderer';
import AdsCard from '../../../layout/card/AdsCard';
import ContactSellerForm from '../../../layout/forms/ContactSellerForm';

dayjs.extend(relativeTime); // fromNow()  // 4 hours ago

const AdView = () => {
  /* state */
  const [ad, setAd] = useState({});
  const [relatedAd, setRelatedAd] = useState();

  /* hook */
  const params = useParams();
  /* useEffect */
  useEffect(() => {
    if (params?.slug) fetchSingleAd();
  }, [params?.slug]);

  const fetchSingleAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelatedAd(data?.relatedAd);
    } catch (err) {
      console.log(err);
    }
  }

  const generatePhotosArray = (photos) => {
    if (photos?.length > 0) {
      const p = photos?.length === 1 ? 2 : 4;
      let arr = [];

      photos.map((x) => arr.push({
        src: x.Location,
        width: p,
        height: p,
      })
      );
      return arr;
    } else {
      return [{
        src: Default,
        width: 2,
        height: 1,
      }]
    }
  };


  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4" style={{ color: "white" }}>
            <div className="d-flex justify-content-between">
              <button className="ad-btn mt-2 disabled">
                <span class="myshadow"></span>
                <span class="edge"></span>
                <span class="front text"> {ad.type} for {ad.action}
                </span>
              </button>
              <Wishlist ad={ad} />
            </div>
            <br />
            <div class="notification">
              <div class="notiglow"></div>
              <div class="notiborderglow"></div>
              <div class="notititle">{ad.sold ? "Off Market (Sold) ❌" : " In Market (Available) ✔️"}</div>
              <div class="notibody">
                <h6 className="address1">{ad.address} 🙎‍♂️ </h6>
                <AdFeature ad={ad} />
              </div>
              <div class="notititle">
                {ad.action == "Rent" ? priceFormatter(ad.price) + 'Rs Rent' :
                  priceFormatter(ad.price) + ' rs price'
                }
                <h6 className="address1">Posted time: {dayjs(ad?.createdAt).fromNow()}</h6>
              </div>

            </div>
            <GoogleMapCard ad={ad} />



          </div>
          <div className="col-lg-8">
            <ImageGallery photos={generatePhotosArray(ad?.photos)} />

          </div>
        </div>

        <div className="row data1 e-card playing">
          <div class="image"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="notification notification1">
            <div class="notiglow"></div>
            <div class="notiborderglow"></div>
            <div class="notibody">
           
                <h2 style={{color: "#fed500;"}}> {ad?.type}  in {ad?.address} for {ad?.action} 
                </h2>
               

                <h5 style={{color: "#F52544"}}> {priceFormatter(ad.price)} rs</h5> 
           
                <AdFeature ad={ad} />
                  
              <h4 style={{color: "#005bba", textDecoration: "underline"}} className='fw-bold'>
              {ad?.title}</h4>
              <p className="lead" style={{ color: "#3d83ff", fontSize: "17px" }}>
                <HTMLRenderer
                  html={ad?.description?.replaceAll(".", "<br/><br />")}
                />
              </p>


            </div>
          </div>

        </div>

      </div>

    

      <div className="container-fluid my-div01 ml-5">
        <h4 style={{ color: "#5b42f3" }} className="text-center mb-4">
        {relatedAd?.length >= 1 ? "Related Properties" : "No Related Properties "}
        </h4>
        <hr style={{border:"1px solid #5b42f3", width: "33%"}} />
        <div className="row">
          <br />
          {relatedAd?.map(ad => (
            <AdsCard key={ad?._id} ad={ad} />
          )
          )}
        </div>
      </div>

      <div className="container-fluid contact_form">
           <ContactSellerForm ad={ad} />
     </div>
    </>
  )
}

export default AdView
