import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import Car from './interfaces/cars';

@Component({
  selector: 'app-admin',
  imports: [NgFor, NgIf, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})

// AdminComponent class
export class AdminComponent implements OnInit {
  manager = 'Ofelia';
  errorMsg = '';

  // constructor
  constructor(private carsService: CarsService, private router: Router) {}

  // initialize cars object
  newCar: Car = {
    make: '',
    model: '',
    year: 0,
    images: [],
  };
  // initialize cars array
  cars: any = [];

  // get cars from service on initial load
  ngOnInit() {
    if (this.cars.length === 0) {
      this.errorMsg = 'No cars found';
    }
    this.getCars();
  }

  // Get cars
  async getCars() {
    await this.carsService.getCars().then((cars) => {
      this.cars = cars;
    });
  }

  // car form
  carForm: FormGroup = new FormGroup({
    year: new FormControl(),
    make: new FormControl(''),
    model: new FormControl(''),
    images: new FormControl([]),
  });

  //handle image upload and add to car object
  fileChange(e: any) {
    const files = e.target.files;
    // for loop input files
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.newCar.images.push({ name: file.name, base: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
  // car form
  async addCar() {
    this.newCar.make = this.carForm.value.make;
    this.newCar.model = this.carForm.value.model;
    this.newCar.year = this.carForm.value.year;

    console.log(this.newCar);

    // send car data to api
    await this.carsService.addCar(this.newCar).then((car) => {
      console.log('Added car to database', car);
    });
    // reset form fields and rerender cars list
    this.getCars();
    this.carForm.reset();
    this.newCar.images.length = 0;
  }

  // delete car
  deleteCar(id: number) {
    this.carsService.deleteCar(id).then((car) => {
      console.log('Deleted car from database', car);
      // rerender cars list
      this.getCars();
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['admin/login']);
  }
}
