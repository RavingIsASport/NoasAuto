import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../../services/cars.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private carsService: CarsService) {}
  cars: any = [];

  // get cars from service on initial load
  ngOnInit() {
    this.getCars();
  }

  // Get cars
  async getCars() {
    await this.carsService.getCars().then((cars) => {
      this.cars = cars;
      console.log(this.cars);
    });
  }
}
