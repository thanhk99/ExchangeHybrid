import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Firststep } from './firststep/firststep';
import { Nextstep } from './nextstep/nextstep';

@Component({
  selector: 'app-create-ads',
  standalone: true,
  imports: [CommonModule, FormsModule, NavTabs, RouterModule, Firststep, Nextstep],
  templateUrl: './create-ads.html',
  styleUrl: './create-ads.css'
})
export class CreateAds {

  constructor() {
  }
   buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '' },
    { label: 'Lệnh của tôi', path: '' },
    { label: 'Hồ sơ của tôi', path: '' },
    { label: 'Thêm', path: '' },
    
  ];

  routes: Routes = [
  {
    path: 'create-ads',
    component: CreateAds,
    children: [
      { path: 'firststep', component: Firststep },
      { path: 'nextstep', component: Nextstep }
    ]
  }
];


}
