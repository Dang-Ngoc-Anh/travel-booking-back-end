import userModel from "../models/User.js";

// update
export const updateuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "update sucess",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to update user. Try again" + error,
    });
  }
};

// delete Tour
export const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to get delete user. Try again" + error.message,
    });
  }
};

// get single user
export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById({ _id: id });
    res.status(200).json({
      success: true,
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        "Fail to get single user. Try again , fix err 404 not found" +
        error.message,
    });
  }
};

// get all user
export const getAlluser = async (req, res) => {
  const page = parseInt(req.query.page);
  console.log(page);
  try {
    const user = await userModel
      .find({})
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      message: "Sucess",
      length: user.length,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to create user. Try again" + error.message,
    });
  }
};
