import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../../shared/nav-tabs/nav-tabs';
import { NavV1Component } from '../../shared/nav-v1/nav-v1.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto',
  standalone: true,
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.css',
  imports: [CommonModule, NavTabs , NavV1Component]
})
export class CryptoComponent {

  constructor(private router: Router) {}

    marketTabs = [
    { label: 'Yêu thích', path: '/market/favourite' },
    { label: 'Tiền mã hóa', path: '/market/crypto' },
    { label: 'Spot', path: '/market/spot' },
    { label: 'Futures', path: '/market/futures' },
    { label: 'Quyền chọn', path: '/market/options' },
    { label: 'Pre-market', path: '/market/pre-market' },
    { label: 'Chỉ số OKX', path: '/market/okx-index' },
    { label: 'Dữ liệu giao dịch', path: '/market/trade-data' },
    { label: 'Dữ liệu arbitrage', path: '/market/arbitrage-data' },
  ];

  //   marketTab = [
  //   { label: 'Tất cả', path: '/market/crypto/all' }

  // ];
  cryptos = [
    { icon: '₿', name: 'BTC', fullname: 'Bitcoin', price: 107511.2, change: 0.16, marketCap: '2,14 NT' },
    { icon: '⧫', name: 'ETH', fullname: 'Ethereum', price: 2442.61, change: 0.23, marketCap: '294,97 T' },
    { icon: '₮', name: 'USDT', fullname: 'Tether', price: 1.0003, change: 0.00, marketCap: '157,69 T' },
    { icon: '✕', name: 'XRP', fullname: 'Ripple', price: 2.1873, change: 0.05, marketCap: '129,06 T' },
    { icon: '🟡', name: 'BNB', fullname: 'BNB', price: 649.80, change: 0.15, marketCap: '94,80 T' },
    { icon: '◎', name: 'SOL', fullname: 'Solana', price: 150.45, change: -0.22, marketCap: '80,47 T' },
    { icon: 'Ⓢ', name: 'USDC', fullname: 'USD Coin', price: 1.0000, change: 0.01, marketCap: '61,69 T' },
  ];



  gotoChart(symbol: string) {
    // Navigate to the chart page for the selected cryptocurrency
    this.router.navigate(['/market/spot/chart', symbol]);
    // Implement navigation logic here, e.g., using Angular Router
  }
}
