import "./roomedit.scss";
import SideBar from "../../componates/sidebar/SideBar";
import Navbar from "../../componates/navbar/Navbar";

import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const RoomEdit = ({ inputs, title }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  const roomId = location.pathname.split("/")[2];
  console.log(roomId);
  const [hotelLoader, setHotelLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState({});
  
  const [rooms, setRooms] = useState('');
  const [textArea, setTextArea] = useState({});

  const { data, loading, error } = useFetch(`/room/${roomId}`);
  const hotelData = useFetch("/hotel");
  var text = "";
  useEffect(() => {
    if (hotelData.data.length == 0) setHotelLoader(true);

    setInfo({
      title: data.title,
      desc: data.desc,
      price: data.price,
      maxPeople: data.maxPeople,
      roomNumbers: data.roomNumbers,
    });

    let isEmpty = JSON.stringify(info) === "{}";
    if (!isEmpty) {
      let value = info.roomNumbers
        .map((data) => {
          return data.number.toString();
        })
        .join(",");
        setTextArea({value});
    }
  }, [data, hotelData.data]);

  const handleChange = (e) => {
    console.log('handleChange...')
    console.log(info)
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info)

  };
  const setRoomChanger = (e)=>{
    console.log('setRoomChanger...')
    console.log(rooms) 
    console.log(textArea)
    console.log(e.target.value)
    setTextArea(e.target.value)
     setRooms(e.target.value)
     console.log(rooms)
     console.log(textArea)
  }

  const handleClick = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(rooms)
    console.log(textArea)
    
    const roomNumbers = await textArea.split(",").map((room) => ({ number: room }));
    console.log(roomNumbers)
    
    try {
      await axios.put(
        `/room/${roomId}`,
        { ...info, roomNumbers },
        { withCredentials: true }
      );
      navigate("/room");
    } catch (err) {
      setLoader(false);
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
                      value={info[input.id]}
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
                    value={textArea.value}
                    onChange={setRoomChanger}
                    placeholder="give comma between room numbers."
                  />
                </div>
             
                <button disabled={loader} onClick={handleClick}>
                  {loader ? "Loading" : "send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomEdit;
