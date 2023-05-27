import express from "express";
import { verifyAdmin } from "../../utils/verifyTokens.js";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  getHotelRooms,
  updateHotel,
} from "../controllers/hotel.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getAllHotel);

//GET countByCity
router.get("/countbycity", countByCity);
//GET countByType
router.get("/countbytype", countByType);
//GET hotels
router.get("/rooms/:id", getHotelRooms);


export default router;
