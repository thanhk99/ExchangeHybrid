import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { AssetsComponent } from '../assets/assets.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-funding-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SummaryComponent, HistoryComponent, AssetsComponent],
  templateUrl: './funding-wallet.html',
  styleUrls: ['./funding-wallet.css']
})
export class FundingWallet {
  activeTab: string = 'assets';
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
  totalValue: number = 1000;
  hasData = true;
  isHidden = false;
  
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

  @Output() navigateToRecharge = new EventEmitter<void>();
  @Output() navigateToConvert = new EventEmitter<void>();
  @Output() navigateToWithdrawal = new EventEmitter<void>();
  @Output() navigateToTransfer = new EventEmitter<void>();

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  onTabSelected(tabPath: string) {
    if (tabPath) {
      this.router.navigate([tabPath]);
      this.updateActiveTab(tabPath);
    }
  }

  updateActiveTab(path: string) {
    const tab = this.assetpagetabs.find(t => t.path === path);
    if (tab) {
      this.activeTab = tab.label.toLowerCase().replace(/ /g, '-');
    } else {
      // Default to 'assets' if no matching path is found
      this.activeTab = 'assets';
    }
  }

  onNavigateToRecharge() {
    this.navigateToRecharge.emit();
    this.router.navigate(['/funding-wallet/recharge']);
    this.activeTab = 'recharge';
  }

  onNavigateToConvert() {
    this.navigateToConvert.emit();
    this.router.navigate(['/funding-wallet/convert']);
    this.activeTab = 'convert';
  }

  onNavigateToWithdrawal() {
    this.navigateToWithdrawal.emit();
    this.router.navigate(['/funding-wallet/withdrawal']);
    this.activeTab = 'withdrawal';
  }

  onNavigateToTransfer() {
    this.navigateToTransfer.emit();
    this.router.navigate(['/funding-wallet/transfer']);
    this.activeTab = 'transfer';
  }
}