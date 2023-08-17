import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// create tour
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Sucess",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Fail to create user. Try again : " + error.message,
    });
  }
};

// User Login
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await userModel.findOne({ email: email });

    // if user don't exits
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    // if user exit then check compare password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // id password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "email incorrect or password" });
    }

    const { password, role, ...rest } = user._doc;
    // create jwt
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: 60 * 60 }
    );

    // set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expires,
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        data: { ...rest },
        token : token
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

// get single tour
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
        "Fail to get single tour. Try again , fix err 404 not found" +
        error.message,
    });
  }
};
