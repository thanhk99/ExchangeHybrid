import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoininfoService } from '../services/coininfo.service';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';


@Component({
  selector: 'app-simple-earn',
  templateUrl: './simple-earn.component.html',
  styleUrls: ['./simple-earn.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NavTabs],
  standalone: true
})
export class SimpleEarnComponent {
  earnTabs = [
    { label: 'Tổng quan', path: '/earn' },
    { label: 'Simple Earn', path: '/simple-earn' },
    { label: 'Đầu tư kép', path: '' },
    { label: 'On-chain Earn', path: '' },
  ];
products: any[] = [];

  constructor(private coininfoService: CoininfoService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.coininfoService.getCoinInfo().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }
}