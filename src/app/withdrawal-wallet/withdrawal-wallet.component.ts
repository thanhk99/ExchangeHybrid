import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawal-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './withdrawal-wallet.component.html',
  styleUrls: ['./withdrawal-wallet.component.css']
})
export class WithdrawalWalletComponent {
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

  showFromDropdown = false;
  showToDropdown = false;
  selectedFromCoin: any = null;
  selectedToNetwork: any = null;
  searchFromQuery = '';
  searchToQuery = '';

  coinList = [
    { symbol: 'USDT', name: 'Tether', img: 'usdt.png' },
    { symbol: 'BTC', name: 'Bitcoin', img: 'btc.png' },
    { symbol: 'ETH', name: 'Ethereum', img: 'eth.png' },
    { symbol: 'PI', name: 'Pi Network', img: 'pi.png' }
  ];

  networkList = [
    { name: 'Tron(TRC20)', min: '0.01 USDT', eta: '1 phút', icon: 'trc20.png' },
    { name: 'Ethereum', min: '0.01 USDT', eta: '7 phút', icon: 'eth.png' },
    { name: 'X Layer', min: '0.01 USDT', eta: '1 phút', icon: 'xlayer.png' }
  ];

  constructor(private router: Router) {}

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false; // Close the other dropdown
  }

  toggleToDropdown() {
    if (this.step < 2) return;
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false; // Close the other dropdown
  }

  selectFromCoin(coin: any) {
    this.selectedFromCoin = coin;
    this.showFromDropdown = false;
    this.step = 2;
  }

  selectToCoin(network: any) {
    this.selectedToNetwork = network;
    this.showToDropdown = false;
    this.step = 3;
  }

  filteredFromCoins() {
    return this.coinList.filter(c =>
      c.symbol.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      (c.img && c.img.toLowerCase().includes(this.searchFromQuery.toLowerCase()))
    );
  }

  filteredToCoins() {
    return this.networkList.filter(n =>
      n.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.min.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.eta.toLowerCase().includes(this.searchToQuery.toLowerCase())
    );
  }

  goBack() {
    this.router.navigate(['/funding-wallet']);
  }
}