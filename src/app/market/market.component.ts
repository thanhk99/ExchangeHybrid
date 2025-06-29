import { Component } from '@angular/core';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { Routes } from '@angular/router';
import { FavouriteComponent } from './favourite/favourite.component';
import { CryptoComponent } from './crypto/crypto.component';
import { SpotComponent } from './spot/spot.component';
import { FuturesComponent } from './futures/futures.component';
import { OptionsComponent } from './options/options.component';
import { PreMarketComponent } from './pre-market/pre-market.component';
import { OkxIndexComponent } from './okx-index/okx-index.component';
import { TradeDataComponent } from './trade-data/trade-data.component';
import { ArbitrageDataComponent } from './arbitrage-data/arbitrage-data.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-market',
  standalone: true,
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',
  imports: [
    NavTabs, 
    FavouriteComponent,
    RouterModule,
    CommonModule
  ]
})
export class MarketComponent {

  constructor( ) {
    // Initialization logic if needed
  }

  routes: Routes = [
    {
      path: 'market',
      component: MarketComponent,
      children: [
        { path: 'favourite', component: FavouriteComponent },
      ]
    }
    
  ];


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

}
