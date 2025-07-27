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
  constructor(private router: Router
  ) {
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

  step = 1;

  showDropdown = false;
  selectedCoin: any = null;
  searchQuery = '';

  showNetworkDropdown = false;
  selectedNetwork: any = null;

  coinList = [
    { symbol: 'USDT', name: 'Tether', icon: '' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '' },
    { symbol: 'ETH', name: 'Ethereum', icon: '' },
    { symbol: 'PI', name: 'Pi Network', icon: '' }
  ];

   networkList = [
    {
      name: 'Tron(TRC20)',
      min: '0.01 USDT',
      eta: '1 phút',
      icon: ''
    },
    {
      name: 'Ethereum',
      min: '0.01 USDT',
      eta: '7 phút',
      icon: ''
    },
    {
      name: 'X Layer',
      min: '0.01 USDT',
      eta: '1 phút',
      icon: ''
    }
  ];

  // Toggle coin dropdown
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Toggle network dropdown
  toggleNetworkDropdown() {
    if (this.step < 2) return;
    this.showNetworkDropdown = !this.showNetworkDropdown;
  }

  // Chọn coin → chuyển sang bước 2
  selectCoin(coin: any) {
    this.selectedCoin = coin;
    this.showDropdown = false;
    this.step = 2;
  }

  // Chọn mạng → chuyển sang bước 3
  selectNetwork(network: any) {
    this.selectedNetwork = network;
    this.showNetworkDropdown = false;
    this.step = 3;
  }

  // Lọc coin theo ô tìm kiếm
  filteredCoins() {
    return this.coinList.filter(c =>
      c.symbol.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasData: boolean = true; 
   isHidden = false;
  totalValue = '0,00';

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

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

 hasDataAsset = false;

}
