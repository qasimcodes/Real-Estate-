import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios';

const ContactSellerForm = ({ ad }) => {
  /* context */
  const [auth, setAuth] = useAuth();

  /* states */
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* hook */
  const navigate = useNavigate();

  const loggedIn = auth.user !== null && auth.token !== "" ;

  useEffect(()=>{
      if(loggedIn){
         setFirst_name(auth.user?.first_name);
         setLast_name(auth.user?.last_name);
         setEmail(auth.user?.email);
         setPhone(auth.user?.phone);
      }
  }, [loggedIn]);

  const handleEnquiry = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post("/contact-seller", {
                 first_name, last_name, email, phone, message,
                 adId:  ad._id
            });
            if(data?.error) {
               toast.error(data?.error);
               setLoading(false);
            } else {
               setLoading(false);
               toast.success("Your enquiry has been emailed to the seller");
               setMessage('');
            }
        } catch (error) {
           console.log(error);
           toast.error("Something went wrong. Try Again");
           setLoading(false);
        }  
  }

  return (
    <div className='contact_seller_form ml-5 mb-4'>

      <h4 style={{ color: "#5b42f3" }} className="text-center mb-4">
        Contact Seller Form
      </h4>
      <hr style={{ border: "1px solid #5b42f3", width: "25%" }} />

      <div className="form-container">
        <div className="form">
          <span className="heading"> Contact: &nbsp;&nbsp;
            <mark style={{ backgroundColor: "#ff7a01", color: "#e8e8e8" }}>
              {ad?.postedBy?.first_name ? ad?.postedBy.first_name + " " + ad?.postedBy.last_name : ad?.postedBy?.username}
            </mark>
          </span>
        </div>
      </div> <br />
      <div className="form-container">
        <div className="form">
          <span className="heading">Get in touch -&nbsp;
            <mark style={{ backgroundColor: "#5b42f3", color: "#e8e8e8" }}>
              To Inquiry about Property
            </mark>
          </span>
          <form onSubmit={handleEnquiry}>
          <input placeholder="Enter First Name" type="text" className="input"
              value={first_name} onChange={(e)=> setFirst_name(e.target.value)} disabled={!loggedIn}  />
          <input placeholder="Enter Last Name" type="text" className="input" 
            value={last_name} onChange={(e)=> setLast_name(e.target.value)}  disabled={!loggedIn}  />

            <input placeholder="Enter Email" type="text" className="input" 
            value={email} onChange={(e) =>setEmail(e.target.value)}  disabled={!loggedIn} />

          <input placeholder="Enter Phone" id="mail" disabled={!loggedIn} type="number" phone className="input" value={phone} onChange={(e)=> setPhone(e.target.value)}  />

          <textarea placeholder="Enter your Message" rows={10} cols={30} id="message" name="message" className="textarea" value={message} autofocus={true} onChange={(e) =>setMessage(e.target.value)} disabled={!loggedIn}  />
          
          <div className="button-container">
            <button className="send-button" disabled={!first_name || !email || loading} >
                {loggedIn ? loading ? "Please wait" : "Send Enquiry" : "Login to send Enquiry"}
            </button>
            <div className="reset-button-container">
              <button id="reset-btn" className="reset-button">Reset</button>
            </div>  
          </div>
          </form>
        </div>
      </div>


    </div >
  )
}

export default ContactSellerForm
