import mongoose from "mongoose";

// Define the schema
const carSchema = new mongoose.Schema({
  year: Number,
  make: String,
  model: String,
  secureUrls: [],
  publicIds: [],
});

// Create the model
const Car = mongoose.model("Car", carSchema);

export default Car;
