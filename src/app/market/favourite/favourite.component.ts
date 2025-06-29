import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../../shared/nav-tabs/nav-tabs';
@Component({
  selector: 'app-favourite',
  standalone: true,
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css',
  imports: [CommonModule, RouterModule, NavTabs]
})
export class FavouriteComponent {


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

   allCoins = [
    {
      symbol: 'BTC/USDT',
      name: 'Bitcoin',
      icon: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
      price: 107654.1,
      change: +0.33,
      low24h: 107052.9,
      high24h: 107728.0,
      volumeCoin: '1,73 N BTC',
      volumeUSD: '$186,70 Tr'
    },
    {
      symbol: 'ETH/USDT',
      name: 'Ethereum',
      icon: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      price: 2443.56,
      change: +0.32,
      low24h: 2419.74,
      high24h: 2448.00,
      volumeCoin: '62,83 N ETH',
      volumeUSD: '$152,89 Tr'
    },
    // ... thêm các đồng coin tương tự như trên
  ];

  selectedSymbols = new Set<string>();
  favorites: any[] = [];
  showFavorites = false;

  toggleSelection(symbol: string) {
    if (this.selectedSymbols.has(symbol)) {
      this.selectedSymbols.delete(symbol);
    } else {
      this.selectedSymbols.add(symbol);
    }
  }

  isSelected(symbol: string): boolean {
    return this.selectedSymbols.has(symbol);
  }

  addToFavorites() {
    this.favorites = this.allCoins.filter(c => this.selectedSymbols.has(c.symbol));
    this.showFavorites = true;
  }

  removeFromFavorites(symbol: string) {
    this.favorites = this.favorites.filter(c => c.symbol !== symbol);
    this.selectedSymbols.delete(symbol);
    if (this.favorites.length === 0) {
      this.showFavorites = false;
    }
  }
}
