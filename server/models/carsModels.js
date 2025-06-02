import mongoose from "mongoose";

// Define the schema
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  milage: Number,
  color: String,
  cashPrice: Number,
  financePrice: Number,
  downPayment: Number,
  status: String,
  secureUrls: [],
  publicIds: [],
});

// Create the model
const Car = mongoose.model("Car", carSchema);

export default Car;
