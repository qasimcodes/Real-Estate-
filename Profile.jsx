import Sidebar from '../../layout/nav/Sidebar'
import { useState, useEffect } from "react";
import { useAuth } from '../../context/auth';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import slugify from "slugify";
import ProfileUpload from '../../layout/forms/ProfileUpload';


const Profile = () => {
    /* context */
    const [auth, setAuth] = useAuth();

    /* state */
    const [username, setUsername] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [about, setAbout] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [photo, setPhoto] = useState(null);

    /* hook */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
      if(auth.user) {  
        setUsername(auth.user?.username);
        setFirst_name(auth.user?.first_name);
        setLast_name(auth.user?.last_name);
        setEmail(auth.user?.email);
        setCompany(auth.user?.company);
        setPhone(auth.user?.phone);
        setAddress(auth.user?.address);
        setAbout(auth.user?.about);
        setPhoto(auth.user?.photo);
      }
    }, []);

    const handleProfileBtn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);       
            const { data } = await axios.put("/update-profile", {
                username, 
                first_name, 
                last_name, 
                email,
                address, 
                company, 
                phone, 
                about, 
                photo
            });
            if(data?.error){
                setLoading(false); 
                toast.error(data.error);              
            } else {
                setAuth({...auth, user: data});             
                let dataFromLS = JSON.parse(localStorage.getItem("auth")) ;
                dataFromLS.user = data;
                localStorage.setItem("auth", JSON.stringify(dataFromLS));
                setLoading(false);  
                toast.success("Profile Updating successfully");
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <div className="container-fluid">
            <h5 className="display-4 bg-secondary text-light">
                User Profile Update
            </h5>
            <div className="d-flex justify-content align-items-center">
                <Sidebar />
                <div className="d-flex text-light ml-5 my_profile">
                    <div className="wrapper">
                        <ProfileUpload photo={photo} setPhoto={setPhoto}  uploading={uploading} setUploading={setUploading}  />
                        <form onSubmit={handleProfileBtn}>
                            <div className="input-box">
                                <input required placeholder="Update your Username" type="text"
                                 value={username} onChange={(e) => setUsername(slugify(e.target.value.toLowerCase()))} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your First Name" type="text"
                                value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your Last Name" type="text"
                                value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your Email" type="text"
                                    value={email} disabled={true} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your Address" type="text"
                                    value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your Phone" type="text"
                                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <input required placeholder="Enter your Company Name" type="text"
                                    value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <textarea placeholder="Enter About yourself in details"
                                    value={about} onChange={(e) => setAbout(e.target.value)}
                                    maxLength={200} />
                            </div>
                            <button className="btn col-12" type="submit" disabled={loading}>
                                {loading ? "Processing" : "Update Profile"}
                            </button>
                        </form>
                    </div>

                  
                </div>
            </div>
        </div>
    )
}

export default Profile
