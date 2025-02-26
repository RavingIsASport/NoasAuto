import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor() {}

  // get cars
  async getCars() {
    let response = await fetch('http://localhost:3001/api/cars');
    let data = await response.json();
    return data;
  }

  // add car
  async addCar(car: any) {
    let newCar = {
      make: car.make,
      model: car.model,
      year: car.year,
      images: car.images,
    };
    return await fetch('http://localhost:3001/api/cars', {
      method: 'POST',
      body: JSON.stringify(newCar),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // delete car
  async deleteCar(id: number) {
    return await fetch(`http://localhost:3001/api/cars/${id}`, {
      method: 'DELETE',
    });
  }
}
