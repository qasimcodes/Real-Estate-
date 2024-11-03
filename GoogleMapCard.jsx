import React from 'react'

import {GOOGLE_PLACES_API_KEY} from "../../config";
import GoogleMapReact from "google-map-react";

const GoogleMapCard = ({ad}) => {

  const defaultProps = {
    center: {
        lat: ad?.location?.coordinates[1],
        lng: ad?.location?.coordinates[0],
    },
    zoom: 15
  }

  if (ad?.location?.coordinates?.length) {  
    return (
          <div class="e-card playing">
                <div class="image"></div>
                <div class="wave"></div>
                <div class="wave"></div>
                <div class="wave"></div>

                  <div class="infotop">
                  <div style={{ width: "100%", height: "500px", opacity: "0.8"}}>
                      <GoogleMapReact 
                        bootstrapURLKeys={{ key: GOOGLE_PLACES_API_KEY }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                      >
                      <div lat={ad?.location?.coordinates[1]} lng={ad?.location?.coordinates[0]}>
                          <span className="lead">📌</span>
                      </div>
                      </GoogleMapReact>                 
                  </div>          
              </div>
          </div>
      );
    }
}

export default GoogleMapCard
