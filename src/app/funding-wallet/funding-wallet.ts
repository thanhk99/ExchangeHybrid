import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-funding-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './funding-wallet.html',
  styleUrls: ['./funding-wallet.css']
})
export class FundingWallet {
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

  hasData = true;
  isHidden = false;
  totalValue = '0,00';
  hasDataAsset = false;
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

  constructor(private router: Router) {}

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  navigateToRecharge() {
    this.router.navigate(['/funding-wallet/recharge']);
  }
  navigateToConvert() {
    this.router.navigate(['/funding-wallet/convert']);
  }

  navigateToWithdrawal() {
    this.router.navigate(['/funding-wallet/withdrawal']); 
  }

  navigateToTransfer() {
    this.router.navigate(['/funding-wallet/transfer']); 
  }
}