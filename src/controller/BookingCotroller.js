import bookingModel from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = bookingModel(req.body);
  try {
    const saveBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "you tour is booked",
      data: saveBooking,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: "internal server error " + error,
    });
  }
};

// get single booking
export const getBooking = async (res, req) => {
  const id = req.pramas.id;
  try {
    const book = await bookingModel.find(id);
    res.status(200).json({
      success: true,
      message: "succeesfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "404 not found",
    });
  }
};

// get single booking
export const getAllBooking = async (res, req) => {
  try {
    const book = await bookingModel.find();
    res.status(200).json({
      success: true,
      message: "succeesfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: "404 not found",
    });
  }
};
