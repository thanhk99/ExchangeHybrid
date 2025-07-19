import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Auth } from './auth.service';

interface Device {
  deviceName: string;
  lastLogin: string;
  browser: string;
  location: string;
  deviceType: string;
  ipAddress: string;
  deviceId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  DEVICE_ID_KEY = "d_i";

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  setDeviceStorage(deviceId: any): void {
    localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
  }

  getDeviceId(): string | null {
    return localStorage.getItem(this.DEVICE_ID_KEY);
  }

  clearDeviceId(): void {
    localStorage.removeItem(this.DEVICE_ID_KEY);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<{ data: Device[], message: string }>(environment.apilistDevice).pipe(
      map(response => {
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else {
          this.toast.error('Không thể tải danh sách thiết bị');
          return [];
        }
      })
    );
  }

  logoutDevice(deviceId: string): Observable<boolean> {
    const body = { deviceId };
    return this.http.post(environment.apiLogout, body).pipe(
      map((res: any) => {
        this.toast.success('Thiết bị đã được đăng xuất thành công');
        if (deviceId === this.getDeviceId()) {
          this.clearDeviceId();
        }
        return true;
      })
    );
  }
}