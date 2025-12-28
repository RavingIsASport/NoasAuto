import { Component } from '@angular/core';
import {
  TitleCasePipe,
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsService } from '../../../services/cars.service';

@Component({
  selector: 'app-car-page',
  imports: [
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    NgIf,
    DecimalPipe,
    NgClass,
  ],
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.css',
})
export default class CarPageComponent {
  // Component properties
  car: any;
  id: any;
  imgIndex: number = 0;

  // Component constructor
  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService
  ) {}

  // On component init
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.car = this.getCar(this.id);
  }

  // Get car by id
  async getCar(id: any) {
    this.car = await this.carsService.getCar(id);
  }

  // img carousel
  imgViews(direction: string) {
    if (direction === 'next') {
      this.imgIndex++;
      if (this.imgIndex >= this.car.publicIds.length) {
        this.imgIndex = 0;
      }
    }
    if (direction === 'prev') {
      this.imgIndex--;
      if (this.imgIndex < 0) {
        this.imgIndex = this.car.publicIds.length - 1;
      }
    }
  }
}
