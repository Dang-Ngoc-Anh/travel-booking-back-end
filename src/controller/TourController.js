import tourModel from "../models/Tour.js";

// create tour
export const createTour = async (req, res) => {
  try {
    const tour = await tourModel.create(req.body);
    // const tourSave = await tour.save();
    // const tourSave = await tour.save();
    res.status(200).json({
      success: true,
      message: "Sucess",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to create tour. Try again" + error.message,
    });
  }
};

// update
export const updateTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await tourModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "update sucess",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to update tour. Try again" + error,
    });
  }
};

// delete Tour
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await tourModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Success",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to get delete tour. Try again" + error.message,
    });
  }
};

// get single tour
export const getSingleTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await tourModel.findById({ _id: id }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Success",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        "Fail to get single tour. Try again , fix err 404 not found" +
        error.message,
    });
  }
};

// get all tour
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  console.log(page);
  try {
    const tour = await tourModel
      .find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Sucess",
      length: tour.length,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to create tour. Try again" + error.message,
    });
  }
};

export const getTourBySearch = async (req, res) => {
  // i mean case sensitive
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte greater than equal
    const tour = await tourModel
      .find({
        city,
        distance: { $gte: distance },
        maxGroupSize: { $gte: maxGroupSize },
      })
      .populate("reviews");
    res.status(200).json({
      success: true,
      message: "Sucess",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "404 not found" + error.message,
    });
  }
};

// get featured tour
export const getFeaturedTour = async (req, res) => {
  try {
    const tour = await tourModel
      .find({ featured: true })
      .populate("reviews")
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Sucess",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to get featured. Try again" + error.message,
    });
  }
};

// get tour count

export const getTourtCount = async (req, res) => {
  try {
    const tour = tourModel.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Sucess",
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "fail to fetch",
    });
  }
};
