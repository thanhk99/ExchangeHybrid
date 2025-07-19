import {  Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { DeviceService } from '../services/device.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface Device {
  deviceName: string;
  lastLogin: string;
  browser: string;
  location: string;
  deviceType: string;
  ipAddress: string;
  deviceId: string;
}

@Component({
  selector: 'app-device-management',
  standalone: true,
  imports: [CommonModule, NavTabs],
  templateUrl: './device-management.html',
  styleUrl: './device-management.css'
})
export class DeviceManagement implements OnInit {
  profiletabs = [
    { label: 'Thông tin', path: '/profile' },
    { label: 'Cài đặt bảo mật', path: '/security' },
    { label: 'Xác minh', path: '/verify' },
    { label: 'Tùy chọn', path: '/options' },
    { label: 'Tài khoản phụ', path: '/subaccount' },
    { label: 'API', path: '/api' },
    { label: 'Ủy quyền chuyển tiếp ba', path: '/forward' }
  ];

  devices: Device[] = [];

  constructor(
    private deviceService: DeviceService,
    private toastr: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.ngZone.run(() => {
          this.devices = devices;
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.toastr.error('Không thể tải danh sách thiết bị, vui lòng thử lại');
          console.log(err);
        });
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getCurrentDeviceId(): string | null {
    return this.deviceService.getDeviceId();
  }

  removeDeviceFromList(deviceId: string): void {
    this.devices = this.devices.filter(device => device.deviceId !== deviceId);
  }

  logoutDevice(deviceId: string): void {
    const isCurrentDevice = deviceId === this.getCurrentDeviceId();
    this.deviceService.logoutDevice(deviceId).subscribe({
      next: (success) => {
        if (success) {
          if (isCurrentDevice) {
            setTimeout(() => {
              this.ngZone.run(() => {
                this.router.navigate(['/login']);
              });
            }, 500);
          } else {
            this.ngZone.run(() => {
              this.removeDeviceFromList(deviceId);
            });
          }
        }
      },
      error: (err) => {
        this.toastr.error('Đăng xuất thất bại, vui lòng thử lại');
        console.log(err);
      }
    });
  }
}