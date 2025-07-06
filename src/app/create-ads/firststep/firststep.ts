import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-firststep',
  templateUrl: './firststep.html',
    imports: [CommonModule, NavTabs, FormsModule, RouterModule],
  styleUrl: './firststep.css'
})
export class Firststep {

   constructor(public router: Router) {
  }
   buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '' },
    { label: 'Lệnh của tôi', path: '' },
    { label: 'Hồ sơ của tôi', path: '' },
    { label: 'Thêm', path: '' },
    
  ];

  selectedTab: 'buy' | 'sell' = 'buy';

  coins = [
  { symbol: 'USDT', name: 'Tether', icon: '' },
  { symbol: 'USDC', name: 'USD Coin', icon: '' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '' },
  { symbol: 'ETH', name: 'Ethereum', icon: '' },
  { symbol: 'TON', name: 'Toncoin', icon: '' }
];

selectedCoin = this.coins[0];
searchTerm = '';
dropdownOpen = false;

get filteredCoins() {
  return this.coins.filter(coin =>
    (coin.symbol + coin.name).toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

selectCoin(coin: any) {
  this.selectedCoin = coin;
  this.dropdownOpen = false;
  this.searchTerm = '';
}

fiats = [
  { code: 'VND', country: 'Vietnam', icon: '' },
  { code: 'USD', country: 'United States', icon: '' },
  { code: 'TTD', country: 'Trinidad and Tobago', icon: '' },
  { code: 'TZS', country: 'Tanzania', icon: '' },
  { code: 'UAH', country: 'Ukraine', icon: '' },
  { code: 'UGX', country: 'Uganda', icon: '' }
];

selectedFiat = this.fiats[0];
searchFiat = '';
fiatDropdownOpen = false;

get filteredFiats() {
  return this.fiats.filter(f =>
    (f.code + f.country).toLowerCase().includes(this.searchFiat.toLowerCase())
  );
}

selectFiat(fiat: any) {
  this.selectedFiat = fiat;
  this.fiatDropdownOpen = false;
  this.searchFiat = '';
}

priceTypes = [
  {
    label: 'Giá cố định',
    description: 'Giá của bạn vẫn cố định và sẽ không bị ảnh hưởng bởi biến động thị trường'
  },
  {
    label: 'Giá thả nổi',
    description: 'Giá của bạn sẽ biến động tùy vào giá thị trường và mức ký quỹ bạn đặt.'
  }
];

selectedPriceType = this.priceTypes[0];
priceDropdownOpen = false;

selectPriceType(option: any) {
  this.selectedPriceType = option;
  this.priceDropdownOpen = false;
}

  marketOptions = [
  {
    label: 'Công khai',
    description: 'Quảng cáo công khai sẽ xuất hiện trên sàn giao dịch P2P'
  },
  {
    label: 'Riêng tư',
    description: 'Quảng cáo riêng tư sẽ không xuất hiện trên sàn giao dịch P2P. Nếu muốn nhận được lệnh, bạn cần chia sẻ quảng cáo.'
  }
];

selectedMarket = this.marketOptions[1]; // Mặc định: Riêng tư
marketDropdownOpen = false;

selectMarket(option: any) {
  this.selectedMarket = option;
  this.marketDropdownOpen = false;
}

price: number | null = null;
amount: number | null = null;

minLimit: number | null = null;
maxLimit: number | null = null;

selectedCrypto = { symbol: 'USDT', name: 'Tether' };

NextStepPage() {
  this.router.navigate(['/create-ads/nextstep']), {
}
}

get isFormValid(): boolean {
  return (
    this.selectedCoin &&
    this.selectedFiat &&
    this.selectedPriceType &&
    this.selectedMarket &&
    this.price !== null && this.price > 0 &&
    this.amount !== null && this.amount > 0 &&
    this.minLimit !== null && this.minLimit > 0 &&
    this.maxLimit !== null && this.maxLimit > 0 &&
    this.minLimit !== null && this.maxLimit !== null && this.minLimit < this.maxLimit
  );
}
}