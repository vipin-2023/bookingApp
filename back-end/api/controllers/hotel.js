import Hotel from "../../models/Hotel.js";
import Room from "../../models/Room.js";

//CREATE FUNCTION
export const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ONE HOTEL FUNCTION
export const getHotel = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE HOTEL FUNCTION
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//DELETE HOTEL FUNCTION
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted ");
  } catch (err) {
    next(err);
  }
};

//GET ALL HOTELS FUNCTION
export const getAllHotel = async (req, res, next) => {
  try {
    const { min, max, limit, ...others } = req.query;
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 10000 },
    }).limit(limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
//GET ALL HOTELS FUNCTION
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });

    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });

    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel)
  
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
