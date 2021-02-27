// login / register hospitals
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Hospital from "../models/hospitalModel.js";
import axios from "axios";
import User from "../models/userModel.js";

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
  const { name, email, address, contactno, availability, password } = req.body;
  const userExist = await Hospital.findOne({ email });

  const hospital = await Hospital.create({
    name,
    email,
    password,
    address,
    contactno,
    ambulance: {
      availability,
      location: { lat, lon },
    },
  });
  if (userExist) {
    res.status(400);
    throw new Error("User Already exists!");
  } else {
    res.json({
      id: hospital._id,
      name: hospital.name,
      token: generateToken(hospital._id),
    });
  }
});

const getHospitals = asyncHandler(async (req, res) => {
  const user = await Hospital.find({});
  res.json(user);
});

const addAmbulance = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findById(req.hospital._id);
  const availability = req.body.availability;

  const data = await axios.get(`http://ip-api.com/json`);
  const lat = data.data.lat;
  const lon = data.data.lon;
  const location = {
    lat,
    lon,
  };

  hospital.ambulance.push({ availability, location });
  hospital.save();

  res.json(hospital);
});

export { registerHospital, getHospitals, addAmbulance };
