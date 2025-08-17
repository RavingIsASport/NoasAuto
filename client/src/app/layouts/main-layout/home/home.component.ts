import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { CarsService } from '../../../services/cars.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe, MatIconModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private carsService: CarsService) {}
  cars: any = [];

  // get cars from service on initial load
  async ngOnInit() {
    await this.getCars();
  }

  // Get cars
  async getCars() {
    await this.carsService.getCars().then((cars) => {
      this.cars = cars;
    });
  }
}
