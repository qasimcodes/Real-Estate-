import Sidebar from '../../layout/nav/Sidebar'
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  /* state */
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSettingsBtn = async (e) => {
      e.preventDefault();
      try { 
          setLoading(true);
          const { data } = await axios.put("/change-password", {
              password,              
          });
          if(data?.error){
              toast.error(data.error);   
              setLoading(false);           
          } else {
              setLoading(false);
              toast.success("Password updated successfully");
          }
      } catch (err) {
          setLoading(false);
          console.log(err);
      }
  }

  return (
      <div className="container-fluid">
          <h5 className="display-4 bg-secondary text-light">
             Settings
          </h5>
          <div className="d-flex justify-content align-items-center">
              <Sidebar />
              <div className="d-flex text-light ml-5 my_profile">
                  <div className="wrapper">
                      <form onSubmit={handleSettingsBtn}>                       
                          <div className="input-box">
                              <input placeholder="Enter your Password" type="password"
                              value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>                       
                          <button className="btn col-12" type="submit" disabled={loading}>
                              {loading ? "Processing" : "Change Password"}
                          </button>
                      </form>
                  </div>              
              </div>
          </div>
      </div>
  )
}

export default Settings
