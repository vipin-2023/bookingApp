import "./newhotel.scss";
import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewHotel = ({ inputs, title }) => {

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  const { data, loading, error } = useFetch("/room");

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

  console.log(files);

  const handleClick = async (e) => {
    setLoader(true)
    e.preventDefault();
    try {
      console.log("inside....files......");

      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dgxkwqgnu/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };
      console.log("new hotel.........");
      console.log(newhotel);


      await axios.post("/hotel", newhotel,{ withCredentials: true });
      navigate("/hotel")
    } catch (err) {
      setLoader(false)
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
                  <select id="rooms"  onChange={handleSelect}>
                    {loading
                      ? "loading"
                      : data &&
                        data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        ))}
                  </select>
                </div>
                <button disabled={loader} onClick={handleClick}>{loader?"Loading":"send"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
