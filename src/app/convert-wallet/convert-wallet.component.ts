import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-convert-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './convert-wallet.component.html',
  styleUrls: ['./convert-wallet.component.css']
})
export class ConvertWalletComponent {
  assetpagetabs = [
    { label: 'Tổng quan', path: '/assetpage' },
    { label: 'Ví Funding', path: 'funding-wallet' },
    { label: 'Ví giao dịch', path: '' },
    { label: 'Tăng trưởng', path: '' },
    { label: 'Phân tích', path: '' },
    { label: 'Trung tâm lệnh', path: '' },
    { label: 'Phí', path: '' },
    { label: 'Sao kê tài khoản', path: '' },
    { label: 'Báo cáo PoR', path: '' },
  ];

  step = 1;

  selectedFromCoin: any = null;
  selectedToCoin: any = null;
  showFromDropdown: boolean = false;
  showToDropdown: boolean = false;
  searchFromQuery: string = '';
  searchToQuery: string = '';
  amountFrom: number = 0; 
  exchangeRate: number = 0.0002;
  calculatedAmountTo: number | null = null;

  coins = [
    { symbol: 'USDT', name: 'Tether', img: 'usdt.png' },
    { symbol: 'BTC', name: 'Bitcoin', img: 'btc.png' },
    { symbol: 'ETH', name: 'Ethereum', img: 'eth.png' },
    { symbol: 'PI', name: 'Pi Network', img: 'pi.png' }
  ];

  constructor(private router: Router) {}

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false; // Close the other dropdown
  }

  toggleToDropdown() {
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false; // Close the other dropdown
  }

  selectFromCoin(coin: any) {
    this.selectedFromCoin = coin;
    this.showFromDropdown = false;
    if (!this.selectedToCoin) this.step = 2; // Move to step 2 only if "to" coin isn't selected yet
    this.calculateAmountTo(); // Recalculate when "from" coin changes
  }

  selectToCoin(coin: any) {
    this.selectedToCoin = coin;
    this.showToDropdown = false;
    if (this.selectedFromCoin) this.step = 3; // Move to step 3 only if both coins are selected
    this.calculateAmountTo(); // Recalculate when "to" coin changes
  }

  filteredFromCoins() {
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchFromQuery.toLowerCase())
    );
  }

  filteredToCoins() {
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchToQuery.toLowerCase())
    );
  }

  calculateAmountTo() {
    if (this.selectedFromCoin && this.selectedToCoin && this.amountFrom > 0) {
      this.calculatedAmountTo = this.amountFrom * this.exchangeRate;
    } else {
      this.calculatedAmountTo = null;
    }
  }

  goBack() {
    this.router.navigate(['/funding-wallet']);
  }
}
