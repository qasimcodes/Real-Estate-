import {useEffect, useState} from "react";
import {Outlet} from  "react-router-dom";
import {useAuth} from '../../context/auth';
import axios from 'axios';

 function PrivateRoute() {
    /* context */
    const [auth, setAuth] = useAuth();
    /* states */
    const [ok, setOk] =  useState(false);
    /* make back-end request useEffect */
    useEffect(()=>{
        if (auth?.token) fetchCurrentUser()

    }, [auth?.token]);

    const fetchCurrentUser = async() => {
        try {
          const {data} = await axios.get("/loggedIn-user", {
              headers: {
                 Authorization: auth?.token
              }
          });
          setOk(true);
        } catch (err){
          setOk(false);
        }
    };

    return ok ? <Outlet /> : "";

}

export default PrivateRoute;