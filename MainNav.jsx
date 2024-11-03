import React from 'react'
import { RiLoginBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaUserTie } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';
import { FaLandmark } from "react-icons/fa6";

const MainNav = () => {
  const [auth, setAuth] =  useAuth();
  const navigate = useNavigate();

  /* Uslogout */
  const logout = () =>{
    setAuth({user: null, token: "", refreshToken: ""});
    localStorage.removeItem("auth");
    navigate("/login");
  }

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "" ;

  const adsPostHandler = () => {
      if(loggedIn) {
          navigate("/ads/create");
      } else {
          navigate("/login");
      }
  }

  console.log(auth?.user?.username);

  return (
   <nav className="nav d-flex lead ml-1">
        <NavLink className="nav-link" aria-current="page" to="/">Home <IoHome className="icon2" /></NavLink>
        <a className="nav-link pointer" onClick={adsPostHandler}>Post New Ad <FaLandmark className="icon2" /> </a>
        {!loggedIn ? (
        <>
        <NavLink className="nav-link" to="/login">Login <RiLoginBoxLine className="icon2" /> </NavLink>
        <NavLink className="nav-link" to="/signup">Signup <SiGnuprivacyguard className="icon2" /></NavLink>
        </>
        ) : ( 
          "" 
        ) }
        {loggedIn ? (
          <>
           <NavLink className="nav-link" to="/dashboard">Dashboard <RxDashboard className="icon2" /></NavLink>
          <div className='dropdown float-right'>
           <li>
               <Link className="nav-link active-d dropdown-toggle pointer" data-bs-toggle="dropdown"> 
                    {auth?.user?.first_name ? auth?.user?.first_name + " " + auth?.user?.last_name 
                    :  auth?.user?.username} {/*auth?.user?.username*/} <FaUserTie className="icon2" /> 
                    <ul className="dropdown-menu">
                      <li>                       
                        {/* <NavLink className="nav-link" to="/dashboard">Dashboard <RxDashboard /></NavLink> */}
                      </li> 
                        <a onClick={logout} className="nav-link">Logout <HiOutlineLogout className="" /> </a>
                    </ul>
               </Link>
            </li>  
        </div>
        </>
        ) : ( 
          "" 
        )} 
  </nav>


  )
}

export default MainNav
