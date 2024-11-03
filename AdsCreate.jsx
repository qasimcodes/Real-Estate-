import { useAuth } from '../../../context/auth';
import Sidebar from "../../../layout/nav/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdsCreate = () => {
  /* states */
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  /* hook */
  const navigate = useNavigate();

  /* buttons handlers for sale & rent */
  const handlerSell = () => {
    setSell(true);
    setRent(false);
  } 
  const handlerRent = () => {
    setRent(true);
    setSell(false);
  }


  return (
    <div>
      <h5 className="display-4 bg-secondary text-light"> Ads Create </h5>
      <div className="d-flex justify-content align-items-center">
        <Sidebar />
        <div className="d-flex text-light ml-5 my-sale-rent">
          <div className="col-lg-6">
            <button title="click button to sell house or plot" onClick={handlerSell} class="shadow__btn_sale">
              Sell
            </button><br /><br />
            { sell && (
              <div className="my-1 d-flex">
                    <button onClick={() => navigate("/ads/create/sell/House")} className="shadow__btn_house mr-2">
                       House
                   </button>
                   <button onClick={() => navigate("/ads/create/sell/Plot")}  className="shadow__btn_plot">
                       Plot
                   </button>
              </div>
            )}
          </div>
          <div className="col-lg-6">
            <button title="click button to rent house or land" onClick={handlerRent}  class="shadow__btn_rent">
              Rent
            </button><br /><br />
            { rent && (
              <div className="my-1 d-flex">
                    <button onClick={() => navigate("/ads/create/rent/House")}  className="shadow__btn_house_2 mr-2">
                       House
                   </button>
                   <button onClick={() => navigate("/ads/create/rent/Land")}  className="shadow__btn_plot_2">
                       Land
                   </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdsCreate
