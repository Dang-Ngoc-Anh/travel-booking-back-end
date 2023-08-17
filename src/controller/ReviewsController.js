import reviewModel from "../models/Review.js";
import tourModel from "../models/Tour.js";
export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new reviewModel({ ...req.body });
  try {
    const saveReview = await newReview.save();
    await tourModel.findByIdAndUpdate(tourId, {
      $push: { reviews: saveReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submited",
      data: saveReview,
    });
  } catch (error) {
    res.status(200).json({
        success: false,
        message: "Review  no submited " + error,
      });
  }
};
