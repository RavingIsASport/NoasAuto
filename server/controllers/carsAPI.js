import { Router } from "express";
import Car from "../models/carsModels.js";
import cloudinary from "../config/cloudinary.js";

const router = Router();

router
  .get("/", async (req, res) => {
    // get all cars from the database
    let cars = await Car.find();

    // if no cars are found, return a 404 error
    if (cars.length === 0) {
      return res.send({ message: "No cars found" });
    }
    res.json(cars);
  })
  .get("/:id", async (req, res) => {
    // get car ID from request parameters
    let idNum = req.params.id;
    // get the car details from the database
    let car = await Car.findById(idNum);
    // if no car is found, return a 404 error
    if (!car) {
      return res.status(404).send({ error: "Car not found" });
    }
    // return the car details
    res.json(car);

    console.log("Car to get", idNum);
  })
  .post("/", async (req, res) => {
    // get the car details from the request body
    let {
      make,
      model,
      year,
      milage,
      color,
      cashPrice,
      financePrice,
      downPayment,
      status,
      images,
    } = req.body;
    console.log("Car received", year, make, model);

    // if no images are received, return a 400 error
    if (!images) {
      return res.status(400).send({ error: "No images received" });
    }
    console.log("Images received", images);

    let secureUrls = [];
    let publicIds = [];
    // upload the images to the cloudinary
    try {
      for (let img of images) {
        let result = await cloudinary.uploader.upload(img.base, {
          folder: "cars",
        });
        secureUrls.push(result.secure_url);
        publicIds.push(result.public_id);
      }
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
    // console.log("Image urls", secureUrls);
    // console.log("Public Ids", publicIds);

    // insert the car details into the database
    try {
      let car = await Car.create({
        make,
        model,
        year,
        milage,
        color,
        cashPrice,
        financePrice,
        downPayment,
        status,
        secureUrls,
        publicIds,
      });

      res.status(201).send(car);
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
  .delete("/:id", async (req, res) => {
    // get car ID from request parameters
    let idNUm = req.params.id;
    console.log("Car to delete", idNUm);

    // delete the car images from cloudinary
    let car = await Car.findById(idNUm);
    // push the public Ids of the images into an array
    // delete the images from cloudinary
    try {
      await cloudinary.api.delete_resources(car.publicIds);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // delete the car from the database
    try {
      await Car.findByIdAndDelete(idNUm);
      res.send({ message: "Car deleted successfully" });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

export default router;
