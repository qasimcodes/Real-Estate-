import React from 'react'
import { FaUser } from "react-icons/fa6";
import { BiSolidLandmark } from "react-icons/bi";
import { GiHouse } from "react-icons/gi";
import { MdNotificationsActive } from "react-icons/md";
import { FaListOl, FaLock } from "react-icons/fa";
import {Link} from "react-router-dom";
import { FaAdversal } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { VscSettingsGear } from "react-icons/vsc";

const Sidebar = () => {
  return (
    
   <div className="sidebar-input">
   <button className="sidebar-value">
   <LuLayoutDashboard className="icon1"  />
   <Link to="/dashboard">  Dashboard </Link>
  </button>
  <button className="sidebar-value">
   <FaAdversal className="icon1"  />
   <Link to="/ads/create">  Create Ads </Link>
  </button>
  <button className="sidebar-value">
  <FaUser className="icon1" />
    <Link to="/user/profile"> Profile </Link>
  </button>
  <button className="sidebar-value">
    <VscSettingsGear className="icon1"  />
    <Link to="/user/settings">  Settings </Link>
  </button>
  <button className="sidebar-value">
  <GiHouse className="icon1"  />
  <Link to="">  Property </Link>
  </button>
  <button className="sidebar-value">
   <MdNotificationsActive className="icon1"  />
   <Link to="">  Notifications </Link>
  </button>
</div>
  )
}

export default Sidebar
