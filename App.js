import "./style.css"
import { FcHome } from "react-icons/fc";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AuthProvider} from "./context/auth"
import MainNav from "./layout/nav/MainNav";
import { Toaster } from 'react-hot-toast'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount";
import Dashboard from "./pages/user/Dashboard";
import AdsCreate from "./pages/user/ads/AdsCreate";
import SellHouse from "./pages/user/ads/SellHouse";
import SellPlot from "./pages/user/ads/SellPlot";
import RentHouse from "./pages/user/ads/RentHouse";
import RentLand from "./pages/user/ads/RentLand";
import AdView from "./pages/user/ads/AdView";
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import AdsEdit from "./pages/user/ads/AdsEdit";

import PrivateRoute from "./layout/routes/PrivateRoute";
import Footer from "./layout/nav/Footer";

function App() {
  return (
    <Router>
      <div className="container-fluid">
          <h1 className="display-3 bg-primary text-light p-3 text-center"> 
                <i className="home">  <FcHome />  </i>ApnaGhar.com 
          </h1>         
          <AuthProvider>
          <MainNav />
          <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/access-account/:token" element={<AccessAccount />} />
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="ads/create" element={<AdsCreate />} />
                  <Route path="ads/create/sell/house" element={<SellHouse />} />
                  <Route path="ads/create/sell/plot" element={<SellPlot/>} />
                  <Route path="ads/create/rent/house" element={<RentHouse />} />
                  <Route path="ads/create/rent/land" element={<RentLand />} />
                  <Route path="user/profile" element={<Profile />} />
                  <Route path="user/settings" element={<Settings />} />
                  <Route path="user/ad/:slug" element={<AdsEdit />} />
                </Route>
                <Route path="/ad/:slug" element={<AdView />} />
            </Routes>
          </AuthProvider>
          <Footer />
          </div>
    </Router>
  );
}

export default App;
