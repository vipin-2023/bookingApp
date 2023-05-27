import "./sidebar.scss";
import Person3Icon from "@mui/icons-material/Person4";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import { Link , useLocation } from "react-router-dom";

function SideBar() {


  const location = useLocation();
  const path = location.pathname.split("/")[1];
 
  console.log(typeof path)
 
  return (
    <>
      <h3 className="side-title">Domains</h3>
      <Link to="/user" style={{ textDecoration: "none" }}>
        <div className={"tab-container" }>
          <div className="icon ">
            <Person3Icon />
          </div>
          <div className="text">Users</div>
        </div>
      </Link>
      <Link to="/hotel" style={{ textDecoration: "none" }}>
        <div className="tab-container">
          <div className="icon">
            <CorporateFareIcon />
          </div>
          <div className="text">Hotels</div>
        </div>
      </Link>
      <Link to="/room" style={{ textDecoration: "none" }}>
        <div className="tab-container">
          <div className="icon">
            <AirlineSeatIndividualSuiteIcon />
          </div>
          <div className="text">Rooms</div>
        </div>
      </Link>
    </>
  );
}

export default SideBar;
