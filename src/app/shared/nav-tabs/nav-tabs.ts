import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-tabs',
  imports: [CommonModule],
  templateUrl: './nav-tabs.html',
  styleUrl: './nav-tabs.css'
})
export class NavTabs {
  tabs = [
    { label: 'Tổng quát', path: '/' },
    { label: 'Thông tin', path: '/profile' },
    { label: 'Cài đặt bảo mật', path: '/security' },
    { label: 'Xác minh', path: '/verify' },
    { label: 'Tùy chọn', path: '/options' },
    { label: 'Tài khoản phụ', path: '/subaccount' },
    { label: 'API', path: '/api' },
    { label: 'Ủy quyền chuyển tiếp ba', path: '/forward' }
  ];

  currentRoute = '';

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.currentRoute = path;
  }

}
