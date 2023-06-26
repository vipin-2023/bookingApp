import { Link, useLocation, useNavigate} from "react-router-dom";


import "./searchItem.css";

function SearchItem({ item }) {
   console.log("...........item...............")
  console.log(item)
  const location = useLocation();
  console.log("..........................search")
  console.log(location)

  const navigate = useNavigate();

 

  const handleSearch = () => {
    navigate(`/hotel/${item._id}`);
  };

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistnce">{item.distance}m from center</span>
        <span className="siTaxiOp">Free aiport taxt</span>
        <span className="siSubtitle">Travel Sustainable property</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today !
        </span>
      </div>

      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailsTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp"> Includes taxes and fees </span>
          <Link to = {`/hotel/${item._id}`} >
          
        
          <button  className="siCheckButton">
            See availability
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
