import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import useFetch from "../../hooks/useFetch";

import "./single.scss";
const Single = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const userId = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  console.log(userId)
  const { data, loading, error } = useFetch(`/${path}/${userId}`);

 
  useEffect(() => {
    console.log('list updated ....')
    setList(data);
  }, [data]);
  return (
    <> 
    <div className="container">
      <Navbar />
      <div className="bottomContainer">
        <div className="sidebar">
          <SideBar />
          </div>
          <div className="contents">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
     
    </div>
    </>
  );
};

export default Single;
