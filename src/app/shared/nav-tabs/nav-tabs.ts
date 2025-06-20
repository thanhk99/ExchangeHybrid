import { Component } from '@angular/core';
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
  tabs = [
    { label: 'Thông tin', path: '/profile' },
    { label: 'Cài đặt bảo mật', path: '/security' },
    { label: 'Xác minh', path: '/verify' },
    { label: 'Tùy chọn', path: '/options' },
    { label: 'Tài khoản phụ', path: '/subaccount' },
    { label: 'API', path: '/api' },
    { label: 'Ủy quyền chuyển tiếp ba', path: '/forward' }
  ];
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
