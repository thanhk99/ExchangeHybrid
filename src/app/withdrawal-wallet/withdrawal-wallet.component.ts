import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawal-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './withdrawal-wallet.component.html',
  styleUrls: ['./withdrawal-wallet.component.css']
})
export class WithdrawalWalletComponent {
  @ViewChild('fromDropdownContainer') fromDropdownContainer!: ElementRef;
  @ViewChild('toDropdownContainer') toDropdownContainer!: ElementRef;

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
  withdrawalType: 'onchain' | 'insystem' = 'onchain';
  contactMethod: 'phone' | 'email' | 'uid' | 'subaccount' = 'email';
  contactValue: string = '';
  step: number = 1;
  isPhoneValid: boolean = false;
  amount: number | null = null;
  showFromDropdown = false;
  showToDropdown = false;
  selectedFromCoin: any = null;
  selectedToNetwork: any = null;
  searchFromQuery = '';
  searchToQuery = '';
  systemEmail: string = '';
  systemUID: string = '';
  systemBalance: string = '';

  coinList = [
    { symbol: 'USDT', name: 'Tether', img: 'usdt.png' },
    { symbol: 'BTC', name: 'Bitcoin', img: 'btc.png' },
    { symbol: 'ETH', name: 'Ethereum', img: 'eth.png' },
    { symbol: 'PI', name: 'Pi Network', img: 'pi.png' }
  ];

  networkList = [
    { name: 'Tron(TRC20)', min: '0.01 USDT', eta: '1 phút', icon: 'trc20.png' },
    { name: 'Ethereum', min: '0.01 USDT', eta: '7 phút', icon: 'eth.png' },
    { name: 'X Layer', min: '0.01 USDT', eta: '1 phút', icon: 'xlayer.png' }
  ];

  constructor(private router: Router) {}

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false; 
  }

  toggleToDropdown() {
    if (this.step < 2 || this.withdrawalType !== 'onchain') return;
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false; 
  }

  selectFromCoin(coin: any) {
    this.selectedFromCoin = coin;
    this.showFromDropdown = false;
    this.step = 2;
  }

  selectToCoin(network: any) {
    this.selectedToNetwork = network;
    this.showToDropdown = false;
    this.step = 3;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const fromDropdown = this.fromDropdownContainer?.nativeElement;
    const toDropdown = this.toDropdownContainer?.nativeElement;

    if (fromDropdown && !fromDropdown.contains(event.target)) {
      this.showFromDropdown = false;
    }
    if (toDropdown && !toDropdown.contains(event.target)) {
      this.showToDropdown = false;
    }
  }

  filteredFromCoins() {
    return this.coinList.filter(c =>
      c.symbol.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      (c.img && c.img.toLowerCase().includes(this.searchFromQuery.toLowerCase()))
    );
  }

  filteredToCoins() {
    return this.networkList.filter(n =>
      n.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.min.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.eta.toLowerCase().includes(this.searchToQuery.toLowerCase())
    );
  }

  validatePhoneNumber() {
    if (this.contactMethod === 'phone' && this.contactValue) {
      const phoneRegex = /^\d{10}$/;
      this.isPhoneValid = phoneRegex.test(this.contactValue);
    } else {
      this.isPhoneValid = false;
    }
  }

  onContactMethodChange() {
    this.contactValue = '';
    this.amount = null;
    this.validatePhoneNumber();
  }

  canProceedToStep3(): boolean {
    if (this.withdrawalType === 'onchain') {
      return !!this.selectedFromCoin && !!this.selectedToNetwork && !!this.amount;
    } else if (this.withdrawalType === 'insystem') {
      return !!this.selectedFromCoin && !!this.contactMethod && !!this.contactValue && !!this.amount && (this.contactMethod !== 'phone' || this.isPhoneValid);
    }
    return false;
  }

  proceedToStep3() {
    if (this.canProceedToStep3()) {
      this.step = 3;
    }
  }

  selectWithdrawalType(type: 'onchain' | 'insystem') {
    this.withdrawalType = type;
    this.contactMethod = 'email';
    this.contactValue = '';
    this.amount = null;
    this.selectedToNetwork = null;
    this.step = 2;
  }
}