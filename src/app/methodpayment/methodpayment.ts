import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

@Component({
  selector: 'app-methodpayment',
  templateUrl: './methodpayment.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  styleUrls: ['./methodpayment.css']
})
export class Methodpayment {

  constructor(private router: Router) {}

selectedMethodIndex: number = 0;
  countdown: number = 45;
  intervalId: any;

  methods = [
    'VPBank – NH Việt Nam Thịnh Vượng',
    'Chuyển khoản ngân hàng',
    'ZaloPay'
  ];

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) this.countdown--;
      else this.resetCountdown();
    }, 1000);
  }

  resetCountdown() {
    this.countdown = 45;
  }

  selectMethod(index: number) {
    this.selectedMethodIndex = index;
  }


  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  buyPage(){
    this.router.navigate(['/buy']);
  }

  AdvertisementPage(){
    this.router.navigate(['/select-advertisement']);
  }
}
