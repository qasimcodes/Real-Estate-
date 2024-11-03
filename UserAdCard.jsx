import { HiMiniShoppingCart } from "react-icons/hi2";
import { PiHeartStraightFill } from "react-icons/pi";
import AdsCreate from './../../pages/user/ads/AdsCreate';
import {Badge} from "antd";
import {Link} from "react-router-dom";
import AdFeature from "./AdFeature";
import {priceFormatter} from "../../helpers/AdHelper";

const UserAdCard = ({ ad }) => {

  return (

<Link to={`/user/ad/${ad.slug}`}>
<section>
   <Badge.Ribbon 
     text={`${ad?.type} for ${ad.action}`}
     color={`${ ad?.action === "Sell"  ? "blue" : "orange"}`}
   >
   <div className="product-card spacing hoverover col-lg-4 p-2 gx-3 gy-3">
    <div className="product-thumb">
      <img src={ad?.photos?.[0].Location} 
      alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`} />
    </div>
    <div className="product-details">
      <h4><a href="#">{ad?.title}</a></h4>
      <span className="product-category">
           <AdFeature ad={ad} />
      </span>
      <div className="product-bottom-details">
      <p className="card-content">{ad?.address}</p>
        <div className="product-price"><small></small>{priceFormatter(ad?.price)} Rs </div>

        <div className="product-links">
          <a className="prod-link">
            <HiMiniShoppingCart />
            </a>
          <a className="prod-link">     
            <PiHeartStraightFill />
          </a>
        </div>
      </div>
    </div>
  </div>
   </Badge.Ribbon>
  <br />
</section>
</Link>

  )
}

export default UserAdCard
