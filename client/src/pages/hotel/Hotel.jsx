import {
  faArrowLeft,
  faArrowRight,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import it from "date-fns/esm/locale/it/index.js";
import { useContext } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "..//../components/reserve/Reserve";
import { AuthContext } from "../../context/authContext";
import { SearchContext } from "../../context/searchContext";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";

function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  console.log(id);
  const { user } = useContext(AuthContext);
  const [sliderNumber, setSliderNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate =useNavigate()

  const { data, loading, error, reFetch } = useFetch(`/hotel/find/${id}`);

  const {dates,options}=useContext(SearchContext);

  console.log("....dates...")
  
  console.log(dates)

  const MILLISECONDS_PER_DAY =1000*60*60*24;
  
  function dayDifference(date1,date2){
    const timeDiff=Math.abs(date2.getTime()-date1.getTime());
    const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
    return diffDays;
  }

  console.log("....hotel...")
  console.log(open)
  console.log(dayDifference(dates[0].endDate,dates[0].startDate))
  
  const days = dayDifference(dates[0].endDate,dates[0].startDate);

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSlideNumer;
    if (direction === "l") {
      newSlideNumer = sliderNumber === 0 ? data.photos?.length - 1 : sliderNumber - 1;
    } else {
      newSlideNumer = sliderNumber === data.photos?.length - 1 ? 0 : sliderNumber + 1;
    }
    setSliderNumber(newSlideNumer);
  };

  const handleClick=()=>{
    if(user){
      setOpenModal(true);

    }else{
      navigate("/login")
    }



  }
  return (
    <div>
      {!open && (
        <>
          {" "}
          <Navbar />
          <Header type="list" />
        </>
      )}
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faXmark}
                className="close"
                onClick={() => {
                  setOpen(false);
                }}
              />
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrow left"
                onClick={() => {
                  handleMove("l");
                }}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[sliderNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="arrow right"
                onClick={() => {
                  handleMove("r");
                }}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button onClick={handleClick} className="bookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistence">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} @ this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div key={i} className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                 {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.0!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b>({days} nights)
                </h2>
                <button onClick={handleClick} >Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  );
}

export default Hotel;
