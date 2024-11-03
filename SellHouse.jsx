import Sidebar from "../../../layout/nav/Sidebar";
import AdsForm from '../../../layout/forms/AdsForm';

const SellHouse = () => {
  return (
    <div> 
        <h5 className="display-4 bg-secondary text-light"> Sell House </h5>
            <div className="d-flex justify-content align-items-center">
            <Sidebar style={{}} />
            <div className="my-1 container mt-2">
                <AdsForm action="Sell" type="House" />
            </div>
        </div>
    </div>
  )
}

export default SellHouse
