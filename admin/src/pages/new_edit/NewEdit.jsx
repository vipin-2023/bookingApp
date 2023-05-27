import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import "./new_edit.scss";
import { useLocation, useNavigate } from "react-router-dom";
const NewEdit = ({ inputs, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const userId = location.pathname.split("/")[2];
  const [list, setList] = useState([]);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const { data, loading, error } = useFetch(`/${path}/${userId}`);
  let navigate = useNavigate();

  console.log(userId);

  useEffect(() => {
    console.log("list updated ....");
    setList(data);
    setInfo({
      username: data.username,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      img: data.img,
    });
    console.log(info.img);
  }, [data]);

  console.log("user information");
  console.log(list);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    setLoader(true)
    console.log("send button function");
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      console.log("inside");
      console.log(file);
      if(file!=""){
        console.log("inside if");
    
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dgxkwqgnu/image/upload",
        data
      );
      console.log(uploadRes.data);
      const { url } = uploadRes.data;

      var newUser = {
        ...info,
        img: url,
      };
    }else{
     
      var newUser = {
        ...info
      };
    }
      console.log(newUser);

      await axios.put(`/user/${userId}`,newUser,{ withCredentials: true });
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
                    : info.img
                    ? info.img
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
                      value={info[input.id]}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                ))}
                <button disabled={loader} onClick={handleClick}>{loader?"Loading":"send"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEdit;
