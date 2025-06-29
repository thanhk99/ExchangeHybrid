import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-v1',
  standalone: true,
  templateUrl: './nav-v1.component.html',
  styleUrl: './nav-v1.component.css',
  imports: [CommonModule , FormsModule]
})
export class NavV1Component {
  activeFilter = 'Tất cả';
  dropdownOpen = false;
  searchTerm = '';

  filters = [
    'Tất cả', 'Hàng đầu', 'Mới', 'AI', 'Solana', 'RWA', 'Meme',
    'Thanh toán', 'DeFi', 'Layer 1', 'Gaming', 'DePIN',
    'Lending', 'Stablecoin', 'NFT', 'Privacy', 'Oracle'
  ];

  get mainFilters() {
    return this.filters.slice(0, 11);
  }

  get moreFilters() {
    return this.filters
      .slice(11)
      .filter(f => f.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  selectFilter(name: string) {
    this.activeFilter = name;
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.searchTerm = '';
  }

}
