import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { NgFor, TitleCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [RouterLink, NgFor, TitleCasePipe, CurrencyPipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  // Inject CarsService
  constructor(private carsService: CarsService) {}

  // Initialize cars array
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
