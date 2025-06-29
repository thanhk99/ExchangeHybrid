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
  isAdded = false;

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

  coins = [
    { code: 'BTC/USDT', name: 'Bitcoin', selected: false },
    { code: 'ETH/USDT', name: 'Ethereum', selected: false },
    { code: 'OKB/USDT', name: 'OKB', selected: false },
    { code: 'XRP/USDT', name: 'XRP', selected: false },
    { code: 'SOL/USDT', name: 'Solana', selected: false },
    { code: 'DOGE/USDT', name: 'Dogecoin', selected: false },
    { code: 'ADA/USDT', name: 'Cardano', selected: false },
    { code: 'BCH/USDT', name: 'Bitcoin Cash', selected: false }
  ];

  favourites: { code: string; name: string; selected: boolean; }[] = [];

  toggleCoin(coin: any) {
    coin.selected = !coin.selected;
  }

  addToFavourite() {
    this.favourites = this.coins.filter(c => c.selected);
    this.isAdded = true;
  }

}
