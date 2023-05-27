import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import {
  productInputs,
  roomInputs,
  userEditInputs,
  hotelInputs,
  userInputs,
} from "./formSource";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Axios from "axios";
import Login from "./pages/login/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import NewRoom from "./pages/newRoom/NewRoom";
import NewEdit from "./pages/new_edit/NewEdit";
import NewHotel from "./pages/new_hotel/NewHotel";
import HotelEdit from "./pages/hotel_edit/HotelEdit";
import RoomEdit from "./pages/room_edit/RoomEdit";


Axios.defaults.baseURL = "http://localhost:8800/api";

function App() {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const istoken = document.cookie.indexOf("access_token") == -1;
  const ProtectedRoute = ({ children }) => {
    if (istoken || !user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  const userChecking = () => {
    if (istoken || !user) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    if (userChecking) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            path="user"
            element={
              <ProtectedRoute>
                <List column={userColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/:userId"
            element={<NewEdit inputs={userEditInputs} title="Edit" />}
          />
          <Route
            path="user/new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
          <Route
            path="hotel"
            element={
              <ProtectedRoute>
                <List column={hotelColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="hotel/:hotelId"
            element={<HotelEdit inputs={hotelInputs} title="Edit" />}
          />

          <Route
            path="hotel/new"
            element={<NewHotel inputs={hotelInputs} title="Add New Hotel" />}
          />

          <Route
            path="room"
            element={
              <ProtectedRoute>
                <List column={roomColumns} />
              </ProtectedRoute>
            }
          />
          <Route
            path="room/:roomId"
            element={<RoomEdit inputs={roomInputs} title="Edit" />}
          />

          <Route
            path="room/new"
            element={<NewRoom inputs={roomInputs} title="Add New Room" />}
          />

          
        </Route>
      </Routes>
    </>
  );
}

export default App;
