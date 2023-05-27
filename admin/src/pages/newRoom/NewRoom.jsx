import "./newroom.scss";
import SideBar from "../../componates/sidebar/SideBar";
import Navbar from "../../componates/navbar/Navbar";

import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("/hotel");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
    
     
      await axios.post(
        `/room/${hotelId}`,
        { ...info, roomNumbers },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="bottomContainer">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="contents">
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input 
                    
                    required
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea
                    onChange={(e) => setRooms(e.target.value)}
                    placeholder="give comma between room numbers."
                  />
                </div>
                <div className="formInput">
                  <label>Choose a hotel</label>
                  <select
                  required
                    id="hotelId"
                    onChange={(e) => setHotelId(e.target.value)}
                  >
                    {loading
                      ? "loading"
                      : data &&
                        data.map((hotel) => (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                  </select>
                </div>
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
