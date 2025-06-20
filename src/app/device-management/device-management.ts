import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-device-management',
  imports: [CommonModule],
  templateUrl: './device-management.html',
  styleUrl: './device-management.css'
})
export class DeviceManagement {
  devices = [
    {
      name: 'Chrome 137.0.0.0',
      os: 'Windows',
      isCurrent: true,
      lastActive: '13:53:50 19 thg 6, 2025',
      lastLogin: '23:07:14 16 thg 6, 2025',
      location: 'VN',
      ip: '14.189.114.122',
    },
    {
      name: 'Firefox 89.0',
      os: 'Linux',
      isCurrent: false,
      lastActive: '10:30:00 18 thg 6, 2025',
      lastLogin: '15:45:10 17 thg 6, 2025',
      location: 'US',
      ip: '192.168.1.1',
    },
    // thêm các dòng tương tự để hiển thị danh sách
  ];

}
