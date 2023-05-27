import * as React from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import axios from "axios";





const DataTable= ({columns})=> {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  console.log(path)
  console.log("Data")
  console.log(data)
  console.log("List")
  console.log(list)
  console.log(error)
  useEffect(() => {
    console.log('list updated ....')
    setList(data);
  }, [data]);

  
  const handleDelete = async (id) => {
    console.log("delete....")
    try {
      await axios.delete(`/${path}/${id}`,{ withCredentials: true });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      
      return (

        <div className="cellAction">
          <Link to={ `/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Edit</div>
          </Link>
          <div
            className="deleteButton"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];


  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
  
      <DataGrid
      className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default DataTable;
