import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Adjust the path as needed
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoininfoService {
  private readonly COIN_INFO_KEY = 'coin_info';

  constructor(private http: HttpClient) {}

  // Lấy thông tin coin từ API
  getCoinInfo(): Observable<any> {
    return this.http.get<any>(environment.apiGetToken);
  }

  // Lưu thông tin coin vào localStorage
  setCoinInfo(coinInfo: any): void {
    localStorage.setItem(this.COIN_INFO_KEY, JSON.stringify(coinInfo));
  }

  // Lấy thông tin coin từ localStorage
  getCoinInfoFromStorage(): any | null {
    const coinInfo = localStorage.getItem(this.COIN_INFO_KEY);
    return coinInfo ? JSON.parse(coinInfo) : null;
  }

  // Xóa thông tin coin
  clearCoinInfo(): void {
    localStorage.removeItem(this.COIN_INFO_KEY);
  }

  // Kiểm tra có thông tin coin không
  hasCoinInfo(): boolean {
    return !!this.getCoinInfoFromStorage();
  }
}