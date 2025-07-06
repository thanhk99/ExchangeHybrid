import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.html',
    imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  styleUrls: ['./buy.css']
})
export class Buy {
  constructor(private router: Router) {
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

dropdownOpen1 = false; // cho ô 1
  dropdownOpen2 = false; // cho ô 2

  fiatCurrencies = [
    { code: 'VND', icon: '' },
    { code: 'USD', icon: '' },
    { code: 'AED', icon: '' },
    { code: 'ARS', icon: '' }
  ];

  cryptoCurrencies = [
    { code: 'USDT', icon: '' },
    { code: 'USDC', icon: '' },
    { code: 'BTC', icon: '' },
    { code: 'ETH', icon: '' },
    { code: 'TON', icon: '' }
  ];

  // Giá trị hiện tại
  selectedPay = { code: 'VND', icon: '' };
  selectedReceive = { code: 'USDT', icon: '' };

amountPay: number | null = null;
amountReceive: number | null = null;
isFormValid: boolean = false;
readonly exchangeRate = 26361;

  switchTab(tab: 'buy' | 'sell') {
  this.activeTab = tab;

  if (tab === 'buy') {
    this.selectedPay = { code: 'VND', icon: '' };
    this.selectedReceive = { code: 'USDT', icon: '' };
  } else {
    this.selectedPay = { code: 'USDT', icon: '' };
    this.selectedReceive = { code: 'VND', icon: '' };
  }

this.amountPay = null;
this.amountReceive = null;

  this.updateFormValidity();
}

  toggleDropdown(which: number) {
    if (which === 1) {
      this.dropdownOpen1 = !this.dropdownOpen1;
      this.dropdownOpen2 = false;
    } else {
      this.dropdownOpen2 = !this.dropdownOpen2;
      this.dropdownOpen1 = false;
    }
  }

  selectCurrency(which: number, currency: any) {
    if (which === 1) this.selectedPay = currency;
    else this.selectedReceive = currency;
    this.dropdownOpen1 = this.dropdownOpen2 = false;
  }

  getPayList() {
    return this.activeTab === 'buy' ? this.fiatCurrencies : this.cryptoCurrencies;
  }

  getReceiveList() {
    return this.activeTab === 'buy' ? this.cryptoCurrencies : this.fiatCurrencies;
  }

  onAmountPayChange(value: string) {
  if (!value) {
    this.amountPay = null;
    this.amountReceive = null;
  } else {
    this.amountPay = parseFloat(value);
    this.amountReceive = this.activeTab === 'buy'
      ? +(this.amountPay / this.exchangeRate).toFixed(2)
      : +(this.amountPay * this.exchangeRate).toFixed(0);
  }

  this.updateFormValidity();
}

onAmountReceiveChange(value: string) {
  if (!value) {
    this.amountReceive = null;
    this.amountPay = null;
  } else {
    this.amountReceive = parseFloat(value);
    this.amountPay = this.activeTab === 'buy'
      ? +(this.amountReceive * this.exchangeRate).toFixed(0)
      : +(this.amountReceive / this.exchangeRate).toFixed(2);
  }

  this.updateFormValidity();
}

updateFormValidity() {
  this.isFormValid =
    this.amountPay !== null &&
    this.amountReceive !== null &&
    !isNaN(this.amountPay) &&
    !isNaN(this.amountReceive) &&
    this.amountPay > 0 &&
    this.amountReceive > 0;
}

methodpaymentPage() {

  this.router.navigate(['/methodpayment']);
}

}
