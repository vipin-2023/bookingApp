import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import "./new.scss"
import { Navigate, useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    console.log("send button function")
    e.preventDefault();
    setLoader(true)
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      console.log("inside")
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgxkwqgnu/image/upload",
        data,
      );
        console.log(uploadRes.data)
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };
      console.log(newUser)

      await axios.post("/auth/register", newUser);
      navigate("/user")
    } catch (err) {
      setLoader(false)

      console.log(err);
    }
  };

  console.log(info);
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
                  file
                    ? URL.createObjectURL(file)
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
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
                <button disabled={loader}  onClick={handleClick}>{loader?"Loading":"send"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
