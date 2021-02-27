// login / register hospitals
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Hospital from "../models/hospitalModel.js";
import axios from "axios";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});

const registerHospital = asyncHandler(async (req, res) => {
  const data = await axios.get(`http://ip-api.com/json`);
  const lat = data.data.lat;
  const lon = data.data.lon;
  const { name, email, password, contactNo, address, availability } = req.body;

  const userExist = await Hospital.findOne({ email });

  const user = await Hospital.create({
    name,
    email,
    password,
    contactNo,
    address,
    ambulance: {
      availability,
      location: {
        lat,
        lon,
      },
    },
  });
  if (userExist) {
    res.status(400);
    throw new Error("User Already exists!");
  } else {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      contactNo: user.contactNo,
      address: user.address,
      ambulance: user.ambulance,
      availability: user.availability,
      token: generateToken(user._id),
    });
  }
});

const getHospitals = asyncHandler(async (req, res) => {
  const user = await Hospital.find({});
  res.json(user);
});

export { registerHospital, getHospitals };
