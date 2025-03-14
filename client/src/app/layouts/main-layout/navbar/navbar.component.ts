import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // nav is used to toggle the mobile nav
  @ViewChild('navLinks') navLinks!: ElementRef;

  // renderer is used to add and remove classes
  constructor(private renderer: Renderer2) {}

  // showIcon is used to toggle the mobile nav icon
  showIcon = true;

  // navToggle is used to toggle the
  // mobile nav when the icon is clicked
  navToggle() {
    // console.log(this.navLinks.nativeElement);
    if (this.navLinks.nativeElement.classList.contains('hidden')) {
      this.renderer.removeClass(this.navLinks.nativeElement, 'hidden');
      this.showIcon = false;
    } else {
      this.renderer.addClass(this.navLinks.nativeElement, 'hidden');
      this.showIcon = true;
    }
  }
}
