import mongoose from "mongoose";

// Define the schema
const carSchema = new mongoose.Schema({
  year: Number,
  make: String,
  model: String,
  price: Number,
  milage: Number,
  vin: String,
  status: String,
  secureUrls: [],
  publicIds: [],
});

// Create the model
const Car = mongoose.model("Car", carSchema);

export default Car;
