import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css'
})
export class MyProfile implements OnInit {
  buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: '/my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },

  ];

  profileData: any = null; // Will hold all data from the API

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.apiService.getUserProfile().subscribe(data => {
      this.profileData = data;
    });

    // Example data
    // this.profileData = {
    //   user: {
    //     username: 'thanhk99',
    //     email: 'thanhk99@example.com',
    //     isVerified: true,
    //     nation: 'Việt Nam',
    //     createdAt: '2023-01-15T12:00:00Z'
    //   },
    //   fundingWallet: {
    //     balance: 12345.67,
    //     lockedBalance: 500.00
    //   },
    //   stats30Days: {
    //     completedOrders: 150,
    //     buyOrders: 100,
    //     sellOrders: 50,
    //     completionRate: 98.5,
    //     uniqueTraders: 45
    //   },
    //   statsAllTime: {
    //     completedOrders: 2500,
    //     totalValueUsd: 500000,
    //     completionRate: 99.1,
    //     avgPaymentTimeSeconds: 300
    //   },
    //   reputation: {
    //     positiveRate: 99.8,
    //     positiveReviews: 1200,
    //     negativeReviews: 2,
    //     followers: 150,
    //     blockedBy: 1
    //   }
    // };
  }

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
