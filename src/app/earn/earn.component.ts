import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoininfoService } from '../services/coininfo.service';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NavTabs],
  standalone: true
})
export class EarnComponent implements OnInit {
  earnTabs = [
    { label: 'Tổng quan', path: '/earn' },
    { label: 'Simple Earn', path: '/earn/simple-earn' },
    { label: 'Đầu tư kép', path: '/earn/savings' },
    { label: 'On-chain Earn', path: '/earn/on-chain-earn' },
  ];

  products: any[] = [];

  constructor(private coininfoService: CoininfoService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.coininfoService.getCoinInfo().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data]; // Ensure data is an array
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }
}