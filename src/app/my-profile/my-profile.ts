import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';


@Component({
  selector: 'app-my-profile',
   standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css'
})
export class MyProfile {
    buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: '/my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },
    
  ];

  constructor() {}

   tab: 'setting' | 'evaluate' = 'setting';

  setTab(tab: 'setting' | 'evaluate') {
    this.tab = tab;
  }

  followTab: 'following' | 'blocked' | 'reported' = 'following';
setFollowTab(tab: 'following' | 'blocked' | 'reported') {
  this.followTab = tab;
}

reviewTab: 'buyer' | 'seller' = 'buyer';
filter: 'all' | 'positive' | 'negative' = 'all';
hasComment: boolean = false;

setReviewTab(tab: 'buyer' | 'seller') {
  this.reviewTab = tab;
}

setFilter(f: 'all' | 'positive' | 'negative') {
  this.filter = f;
}


}
