import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

@Component({
  selector: 'app-select-advertisement',
  templateUrl: './select-advertisement.html',
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  styleUrl: './select-advertisement.css'
})
export class SelectAdvertisement {

  constructor(private router: Router) {}

  countdown = 45;
  intervalId: any;

  selectedAdIndex: number | null = 0;

  ads = [
    { badge: 'Giá tốt nhất', name: 'Tốc Độ Tận Tâm', price: 26470, trades: 31374, rate: 99.58, star: 99.37 },
    { badge: 'Tỷ lệ hoàn tất cao nhất', name: 'Giao Dịch Uy Tín 888', price: 39147, trades: 8108, rate: 99.76, star: 99.05 },
    { badge: 'Đang trực tuyến', name: 'Tốc Độ Tận Tâm', price: 26470, trades: 31374, rate: 99.58, star: 99.37 },
  ];

  payAmount = 133333;
  receiveAmount = 5.03;
  bankMethod = 'VPBank – NH Việt Nam Thịnh Vượng';

  get selectedAd() {
    return this.selectedAdIndex !== null ? this.ads[this.selectedAdIndex] : null;
  }

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else this.countdown = 45;
    }, 1000);
  }

  selectAd(index: number) {
    this.selectedAdIndex = index;
    const price = this.ads[index].price;
    this.receiveAmount = +(this.payAmount / price).toFixed(2);
  }

  goToPayment() {
    this.router.navigate(['/buy']);
  }

  goToMethod() {
    this.router.navigate(['/methodpayment']);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
