import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // nav is used to toggle the mobile nav
  @ViewChild('navLinks') navLinks!: ElementRef;

  // renderer is used to add and remove classes
  constructor(private renderer: Renderer2, private router: Router) {
    // Listen for route changes to update active links
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLinks();
      }
    });
  }

  // showIcon is used to toggle the mobile nav icon
  showIcon = true;

  // navToggle is used to toggle the
  // mobile nav when the icon is clicked
  navToggle() {
    // console.log(this.navLinks.nativeElement);
    if (this.showIcon) {
      // Show the menu
      this.renderer.removeClass(this.navLinks.nativeElement, 'hidden');
      this.showIcon = false;
    } else {
      // Hide the menu
      this.renderer.addClass(this.navLinks.nativeElement, 'hidden');
      this.showIcon = true;
    }
  }

  private updateActiveLinks() {
    // Angular's routerLinkActive should handle this automatically
    // You can remove this method if routerLinkActive is working
  }
}
