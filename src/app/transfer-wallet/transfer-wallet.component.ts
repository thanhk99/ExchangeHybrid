import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent {
  @ViewChild('fromDropdownContainer') fromDropdownContainer!: ElementRef;
  @ViewChild('toDropdownContainer') toDropdownContainer!: ElementRef;
  @ViewChild('coinDropdownContainer') coinDropdownContainer!: ElementRef;

  assetpagetabs = [
    { label: 'Tổng quan', path: '/assetpage' },
    { label: 'Ví Funding', path: '/funding-wallet' },
    { label: 'Ví giao dịch', path: '' },
    { label: 'Tăng trưởng', path: '' },
    { label: 'Phân tích', path: '' },
    { label: 'Trung tâm lệnh', path: '' },
    { label: 'Phí', path: '' },
    { label: 'Sao kê tài khoản', path: '' },
    { label: 'Báo cáo PoR', path: '' },
  ];

  step = 1;
  amountFrom: number | null = null;
  showFromDropdown = false;
  showToDropdown = false;
  showCoinDropdown = false;
  selectedFromAccount: any = null;
  selectedToAccount: any = null;
  selectedCoin: any = null;
  searchFromQuery = '';
  searchToQuery = '';
  searchCoinQuery = '';

  accountList = [
    { name: 'Ví Funding' },
    { name: 'Ví Giao dịch' },
    { name: 'Ví Tiết kiệm' }
  ];

  coinList = [
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'PI', name: 'Pi Network' }
  ];

  constructor(private router: Router) {}

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false;
    this.showCoinDropdown = false;
  }

  toggleToDropdown() {
    if (this.step < 2) return;
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false;
    this.showCoinDropdown = false;
  }

  toggleCoinDropdown() {
    if (this.step < 3) return;
    this.showCoinDropdown = !this.showCoinDropdown;
    this.showFromDropdown = false;
    this.showToDropdown = false;
  }

  selectFromAccount(account: any) {
    this.selectedFromAccount = account;
    this.showFromDropdown = false;
    this.selectedToAccount = null; // Reset to account to prevent invalid selection
    this.step = 2;
  }

  selectToAccount(account: any) {
    this.selectedToAccount = account;
    this.showToDropdown = false;
    this.step = 3;
  }

  selectCoin(coin: any) {
    this.selectedCoin = coin;
    this.showCoinDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const fromDropdown = this.fromDropdownContainer?.nativeElement;
    const toDropdown = this.toDropdownContainer?.nativeElement;
    const coinDropdown = this.coinDropdownContainer?.nativeElement;

    if (fromDropdown && !fromDropdown.contains(event.target)) {
      this.showFromDropdown = false;
    }
    if (toDropdown && !toDropdown.contains(event.target)) {
      this.showToDropdown = false;
    }
    if (coinDropdown && !coinDropdown.contains(event.target)) {
      this.showCoinDropdown = false;
    }
  }

  filteredFromAccounts() {
    return this.accountList.filter(a =>
      a.name.toLowerCase().includes(this.searchFromQuery.toLowerCase())
    );
  }

  filteredToAccounts() {
    return this.accountList.filter(a =>
      a.name !== this.selectedFromAccount?.name &&
      a.name.toLowerCase().includes(this.searchToQuery.toLowerCase())
    );
  }

  filteredCoins() {
    return this.coinList.filter(c =>
      c.symbol.toLowerCase().includes(this.searchCoinQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(this.searchCoinQuery.toLowerCase())
    );
  }

  canProceedToStep3(): boolean {
    return !!this.selectedFromAccount && !!this.selectedToAccount && !!this.amountFrom && !!this.selectedCoin && this.selectedFromAccount.name !== this.selectedToAccount.name;
  }

  proceedToStep3() {
    if (this.canProceedToStep3()) {
      this.step = 3;
    }
  }
}