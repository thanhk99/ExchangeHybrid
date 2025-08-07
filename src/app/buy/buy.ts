import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.html',
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  styleUrls: ['./buy.css']
})
export class Buy implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.dropdownOpen1 = false;
    this.dropdownOpen2 = false;
    this.searchTerm1 = '';
    this.searchTerm2 = '';
  }

  buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: 'my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },
  ];

  activeTab: 'buy' | 'sell' = 'buy';

  dropdownOpen1 = false;
  dropdownOpen2 = false;

  currencyToCountryCode: { [key: string]: string } = {
    'VND': 'VN', 'USD': 'US', 'AED': 'AE', 'ARS': 'AR', 'ALL': 'AL', 'AMD': 'AM', 'ANG': 'AN',
  };

  fiatCurrencies = Object.keys(this.currencyToCountryCode).map(code => ({
    code: code,
    icon: this.getFlagIcon(this.currencyToCountryCode[code])
  }));

  cryptoCurrencies = [
    { code: 'USDT', icon: 'usdt.png' }, { code: 'USDC', icon: 'usdc.png' },
    { code: 'BTC', icon: 'btc.png' }, { code: 'ETH', icon: 'eth.png' }, { code: 'TON', icon: 'ton.png' }
  ];

  selectedPay = { code: 'VND', icon: this.getFlagIcon('VN') };
  selectedReceive = { code: 'USDT', icon: 'usdt.png' };

  searchTerm1: string = '';
  searchTerm2: string = '';

  amountPay: number | null = null;
  amountReceive: number | null = null;
  isFormValid: boolean = false;
  isAmountInvalid: boolean = false;

  availableBalance: number = 0;
  transactionLimit = { min: 130000, max: 2600000000 };

  currencyLimits: { [key: string]: { min: number, max: number } } = {
    'USD': { min: 5.2, max: 104000 }, 'AED': { min: 19.1, max: 382352 },
    'ARS': { min: 4333, max: 86666667 }, 'ALL': { min: 500, max: 10000000 },
    'AMD': { min: 2000, max: 40000000 }, 'ANG': { min: 9.35, max: 187050 },
    'VND': { min: 130000, max: 2600000000 }
  };

  ngOnInit(): void {
    this.loadInitialData();
    this.updateTransactionLimit();
  }

  loadInitialData() {
    this.apiService.getUserProfile().subscribe(profile => {
      if (profile && profile.fundingWallet) {
        this.availableBalance = profile.fundingWallet.balance;
      }
    });
  }

  switchTab(tab: 'buy' | 'sell') {
    this.activeTab = tab;
    this.resetAmounts();
    if (tab === 'buy') {
      this.selectedPay = { code: 'VND', icon: this.getFlagIcon('VN') };
      this.selectedReceive = { code: 'USDT', icon: 'usdt.png' };
    } else {
      this.selectedPay = { code: 'USDT', icon: 'usdt.png' };
      this.selectedReceive = { code: 'VND', icon: this.getFlagIcon('VN') };
    }
    this.updateTransactionLimit();
  }

  toggleDropdown(which: number) {
    if (which === 1) this.dropdownOpen1 = !this.dropdownOpen1;
    else this.dropdownOpen2 = !this.dropdownOpen2;
  }

  selectCurrency(which: number, currency: any) {
    if (which === 1) this.selectedPay = currency;
    else this.selectedReceive = currency;
    this.resetAmounts();
    this.updateTransactionLimit();
  }

  getFlagIcon(countryCode: string) {
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  }

  getPayList() {
    const list = this.activeTab === 'buy' ? this.fiatCurrencies : this.cryptoCurrencies;
    return list.filter(c => c.code.toLowerCase().includes(this.searchTerm1.toLowerCase()));
  }

  getReceiveList() {
    const list = this.activeTab === 'buy' ? this.cryptoCurrencies : this.fiatCurrencies;
    return list.filter(c => c.code.toLowerCase().includes(this.searchTerm2.toLowerCase()));
  }

  onSearch(which: number, value: string) {
    if (which === 1) this.searchTerm1 = value;
    else this.searchTerm2 = value;
  }

  handleAmountChange(value: string, type: 'pay' | 'receive') {
    const sanitizedValue = value.toString().replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(sanitizedValue);

    if (type === 'pay') {
      this.amountPay = (!isNaN(numericValue) && numericValue >= 0) ? numericValue : null;
    } else {
      this.amountReceive = (!isNaN(numericValue) && numericValue >= 0) ? numericValue : null;
    }
    this.validateForm();
  }

  validateForm() {
    const amount = this.activeTab === 'buy' ? this.amountPay : this.amountReceive;
    if (amount === null || amount <= 0) {
      this.isFormValid = false;
      this.isAmountInvalid = false;
      return;
    }
    const isInLimit = amount >= this.transactionLimit.min && amount <= this.transactionLimit.max;
    this.isFormValid = isInLimit;
    this.isAmountInvalid = !isInLimit;
  }

  updateTransactionLimit() {
    const code = this.activeTab === 'buy' ? this.selectedPay.code : this.selectedReceive.code;
    this.transactionLimit = this.currencyLimits[code] || { min: 0, max: Infinity };
    this.validateForm();
  }

  resetAmounts() {
    this.amountPay = null;
    this.amountReceive = null;
    this.isFormValid = false;
    this.isAmountInvalid = false;
  }

  methodpaymentPage() {
    this.router.navigate(['/methodpayment']);
  }
}
