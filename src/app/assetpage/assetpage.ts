import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

@Component({
  selector: 'app-assetpage',
  templateUrl: './assetpage.html',
  imports: [CommonModule, RouterModule, NavTabs],
  styleUrl: './assetpage.css'
})
export class Assetpage {
  constructor(private router: Router
              
  ) {
  }

  hasData: boolean = true; 

  isHidden = false;
  totalValue = '0,00';

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  assetpagetabs = [
    { label: 'Tổng quan', path: '/assetpage' },
    { label: 'Ví Funding', path: '/funding-wallet' },
    { label: 'Ví giao dịch', path: '' },
    { label: 'Tăng trưởng', path: '' },
    { label: 'Phân tích', path: '' },
    { label: 'Trung tâm lệnh', path: '' },
    { label: 'Phí', path: '' },
    { label: 'Sao kê tài khoản', path: '' },
    { label: 'Báo cáo PoR', path: '' },
  ];

  fundingHistory = [
  {
    description: 'Rút tiền USDC',
    amount: -100.909494,
    token: 'USDC',
    time: '14:30',
    date: '22/06/2025'
  },
  {
    description: 'Nạp tiền USDT',
    amount: 100.96,
    token: 'USDT',
    time: '14:20',
    date: '22/06/2025'
  }
];

  assetList = [
  {
    name: 'USDT',
    logo: '',
    balance: 0.00000054,
    valueUSD: '<$0.01',
    pnl: '--'
  },
  {
    name: 'USDC',
    logo: '',
    balance: 0.00000049,
    valueUSD: '<$0.01',
    pnl: '--'
  }
];

}