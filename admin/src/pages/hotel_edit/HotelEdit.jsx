import "./hoteledit.scss";
import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";

import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const HotelEdit = ({ inputs, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const hotelId = location.pathname.split("/")[2];

  const [files, setFiles] = useState("");
  const [roomsLoader, setRoomsLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  const [info, setInfo] = useState({});
  const roomData = useFetch("/room");
  const { data, loading, error } = useFetch(`/${path}/find/${hotelId}`);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    console.log("list updated ....");
    console.log(data);
    if (roomData.data.length == 0) setRoomsLoader(true);
    // setList(data);
    setInfo({
      name: data.name,
      type: data.type,
      city: data.city,
      address: data.address,
      distance: data.distance,
      title: data.title,
      desc: data.desc,
      photos: data?.photos,
      cheapestPrice: data.cheapestPrice,
      featured: data.featured,
    });
  }, [data, roomData.data]);
  console.log(info.photos);
  console.log(files);
  if (files !== "" && info.photos.length == 0) {
    setInfo({
      ...info,
      photos: [
        "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
      ],
    });
  }
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  const handleClick = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      console.log(files);
      if (files[0] !== "") {
        const list = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "upload");

            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dgxkwqgnu/image/upload",
              data
            );
            const { url } = uploadRes.data;
            console.log("img url ....");
            console.log(url);
            return url;
          })
        );
        var newhotel = {
          ...info,
          rooms,
          photos: list,
        };
      } else {
        console.log("..else Object...");
        newhotel = {
          ...info,
          rooms,
        };
      }
      let result = await axios.put(`/hotel/${hotelId}`, newhotel, {
        withCredentials: true,
      });
      console.log(result);
      navigate("/hotel");
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
            <div className="left">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : info.photos
                    ? info.photos[0]
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    
                    onChange={(e) => setFiles(e.target.files)}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      value={info[input.id]}
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Rooms</label>
                  <select id="rooms" onChange={handleSelect}>
                    {roomsLoader
                      ? roomData.data &&
                        roomData.data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))
                      : "loading"}
                  </select>
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

export default HotelEdit;
