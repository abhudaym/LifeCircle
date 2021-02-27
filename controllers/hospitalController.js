// login / register hospitals
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Hospital from "../models/hospitalModel.js";
import User from "../models/userModel.js";
import axios from "axios";
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const hospital = await Hospital.findOne({ email });
  if (hospital && (await hospital.matchPassword(password))) {
    res.json({
      _id: hospital._id,
      name: hospital.name,
      email: hospital.email,
      isAdmin: hospital.isAdmin,
      token: generateToken(hospital._id),
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

// const getUserFromId = asyncHandler(async (req, res) => {
//   let name = [];
//   req.hospital.SOS.map(async (i) => {
//     const user = await User.findById(i._id);
//     console.log(i._id);
//     console.log(user._id);
//     console.log(user.name);
//   });
//   console.log(name);
// });

export { authUser, registerHospital, getHospitals, addAmbulance };
