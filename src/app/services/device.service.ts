import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  DEVICE_ID_KEY = "d_i"
  setDeviceStorage(deviceId:any){
    localStorage.setItem(this.DEVICE_ID_KEY, deviceId);
  }

  getDeviceId(){
    return localStorage.getItem(this.DEVICE_ID_KEY);
  }
  clearDeviceId() :void {
    localStorage.removeItem(this.DEVICE_ID_KEY);
  }
}
