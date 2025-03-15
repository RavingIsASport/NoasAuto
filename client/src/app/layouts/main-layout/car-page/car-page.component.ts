import { Component } from '@angular/core';
import { TitleCasePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarsService } from '../../../services/cars.service';

@Component({
  selector: 'app-car-page',
  imports: [RouterLink, TitleCasePipe, CurrencyPipe, DecimalPipe],
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.css',
})
export class CarPageComponent {
  car: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.car = this.getCar(this.id);
  }

  async getCar(id: any) {
    this.car = await this.carsService.getCar(id);
  }
}
