import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-nav-tabs',
  imports: [CommonModule],
  templateUrl: './nav-tabs.html',
  styleUrl: './nav-tabs.css'
})
export class NavTabs {
  @Input() tabs: { label: string; path: string }[] = [];

  @Input() showOnlyOnNonHome = true;


  menuOpen = false;

  currentRoute = '';

  constructor(private router: Router) {
    // Lắng nghe sự thay đổi URL và cập nhật lại currentRoute
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  get isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.currentRoute = path;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
