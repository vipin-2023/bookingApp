import express from "express";
import { verifyAdmin } from "../../utils/verifyTokens.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router = express.Router();

//CREATE
router.post("/:hotelid",verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);

//UPDATE
router.put("/availability/:id",updateRoomAvailability);
//DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);
//GET
router.get("/:id",getRoom);
//GET ALL
router.get("/",getAllRoom);

export default router