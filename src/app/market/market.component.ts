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
import { ChartComponent } from './spot/chart/chart.component';


@Component({
  selector: 'app-market',
  standalone: true,
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',
  imports: [
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
        { path: 'crypto', component: CryptoComponent },
        { path: 'spot', component: SpotComponent, 
          children: [
            { path: 'chart', component: ChartComponent }
          ]
        },
        { path: 'futures', component: FuturesComponent },
        { path: 'options', component: OptionsComponent },
        { path: 'pre-market', component: PreMarketComponent },
        { path: 'okx-index', component: OkxIndexComponent },
        { path: 'trade-data', component: TradeDataComponent },
        { path: 'arbitrage-data', component: ArbitrageDataComponent },
  
      ]
    }
    
  ];


  marketTabs = [
    { label: 'Yêu thích', path: 'favourite' },
    { label: 'Tiền mã hóa', path: 'crypto' },
    { label: 'Spot', path: 'spot' },
    { label: 'Futures', path: 'futures' },
    { label: 'Quyền chọn', path: 'options' },
    { label: 'Pre-market', path: 'pre-market' },
    { label: 'Chỉ số OKX', path: 'okx-index' },
    { label: 'Dữ liệu giao dịch', path: 'trade-data' },
    { label: 'Dữ liệu arbitrage', path: 'arbitrage-data' },
  ];

}
