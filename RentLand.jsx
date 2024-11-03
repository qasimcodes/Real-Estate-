import Sidebar from "../../../layout/nav/Sidebar";
import AdsForm from '../../../layout/forms/AdsForm';

const RentLand = () => {
  return (
    <div> 
        <h5 className="display-4 bg-secondary text-light"> Rent Land</h5>
            <div className="d-flex justify-content align-items-center">
            <Sidebar />
            <div className="my-1 d-flex container mt-2">
                <AdsForm action="Rent" type="Land" />
            </div>
        </div>
    </div>
  )
}

export default RentLand
