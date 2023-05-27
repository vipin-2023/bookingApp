import "./list.scss";
import Navbar from "../../componates/navbar/Navbar";
import SideBar from "../../componates/sidebar/SideBar";
import DataTable from "../../componates/datatable/DataTable";
function List({column}) {
  return (
    <>
      <div className="container">
        <Navbar />
        <div className="bottomContainer">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="contents">
            <DataTable columns={column}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
