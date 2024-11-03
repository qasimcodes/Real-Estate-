import { useAuth } from "../../context/auth";
import Sidebar from "../../layout/nav/Sidebar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserAdCard from "../../layout/card/UserAdCard";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const seller = auth.user?.role.includes(`Seller`);

  /* state */
  const [ads, setAds] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [auth.token !== ""]);

  useEffect(() => {
    if(page === 1) return;
    fetchAds();
  }, [page]);


  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/user-ads/${page}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

/*
  const loadMore = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`/user-ads/${page}`);
      setAds([...ads, ...data.ads]);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}
*/

  return (
    <div>
      <h5 className='display-4 bg-secondary text-light'> Dashboard</h5>
      <div className='d-flex justify-content align-items-center'>
        <Sidebar />
        {!seller ? (
          <div
            className='d-flex justify-content-center align-items-center vh-10'
            style={{
              backgroundColor: "#e8e8e8",
              padding: "15px",
              marginLeft: "10px",
              marginTop: "-5%",
              borderRadius: "10px",
            }}>
            <h2>
              Hello {auth.user?.first_name ? auth.user?.first_name + " " + auth.user?.last_name : auth.user?.username},
              Welcome to Apnaghar.com Property App
            </h2>
          </div>
        ) : (
          <div
            className='container'
            style={{
              backgroundColor: "#e8e8e8",
              padding: "15px",
              marginLeft: "80px",
              marginTop: "1%",
              borderRadius: "10px",
            }}>
            <div className='row'>
              <div className='col-md-8 offset-lg-2 ads-t text-center'>
                <h2 className='list-t'> List of Ads </h2>
                <hr />
                <p className=''> Total {total} ads found!</p>
              </div>
            </div>
            <div className='row mt-4 ml-5'>
              {ads?.map((ad) => (
                <UserAdCard key={ad._id} ad={ad} />
              ))}
            </div>
            {ads.length < total ? (
            <div className='row bg-21'>
              <div className='col text-center mt-4 mb-4'>
                <button
                   disabled={loading}
                   className="loadbtn"
                   onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                   }}
                >
                  {loading ? "Loading..." : `${ads?.length} / ${total} Load More`}
                </button>
              </div>
            </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
