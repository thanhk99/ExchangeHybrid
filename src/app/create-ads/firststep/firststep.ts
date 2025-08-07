import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-firststep',
  templateUrl: './firststep.html',
  imports: [CommonModule, NavTabs, FormsModule, RouterModule],
  styleUrl: './firststep.css'
})
export class Firststep {

  constructor(public router: Router, private _eref: ElementRef) {
  }
  buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '' },
    { label: 'Lệnh của tôi', path: '' },
    { label: 'Hồ sơ của tôi', path: '' },
    { label: 'Thêm', path: '' },

  ];

  selectedTab: 'buy' | 'sell' = 'buy';

  selectTab(tab: 'buy' | 'sell') {
    this.selectedTab = tab;
    this.resetInputs();
  }

  coinList = [
    { name: 'USDT', icon: '/usdt.png' },
    { name: 'USDC', icon: '/usdc.png' },
    { name: 'BTC', icon: '/btc.png' },
    { name: 'ETH', icon: '/eth.png' },
    { name: 'TON', icon: '/ton.png' }
  ];

  selectedCoin = this.coinList[0];
  searchCoin = '';
  dropdownOpen: string | null = null;

  toggleDropdown(type: string) {
    if (this.dropdownOpen === type) {
      this.dropdownOpen = null;
      // Reset search term when closing the dropdown
      if (type === 'coin') {
        this.searchCoin = '';
      } else if (type === 'currency') {
        this.searchCurrency = '';
      }
    } else {
      this.dropdownOpen = type;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.dropdownOpen = null;
    this.searchCoin = '';
    this.searchCurrency = '';
  }

  onSearch(type: 'coin' | 'currency', value: string) {
    if (type === 'coin') {
      this.searchCoin = value;
    } else if (type === 'currency') {
      this.searchCurrency = value;
    }
  }

  get filteredCoinList() {
    if (!this.searchCoin) {
      return this.coinList;
    }
    return this.coinList.filter(coin =>
      coin.name.toLowerCase().includes(this.searchCoin.toLowerCase())
    );
  }

  selectCoin(coin: any) {
    this.selectedCoin = coin;
    this.dropdownOpen = null;
    this.searchCoin = '';
    this.resetInputs();
  }

  currencyList = [
    { name: 'VND', code: 'VN', icon: 'https://flagsapi.com/VN/flat/64.png' },
    { name: 'AED', code: 'AE', icon: 'https://flagsapi.com/AE/flat/64.png' },
    { name: 'ALL', code: 'AL', icon: 'https://flagsapi.com/AL/flat/64.png' },
    { name: 'AMD', code: 'AM', icon: 'https://flagsapi.com/AM/flat/64.png' },
    { name: 'ANG', code: 'AN', icon: 'https://flagsapi.com/AN/flat/64.png' },
    { name: 'ARS', code: 'AR', icon: 'https://flagsapi.com/AR/flat/64.png' },
  ];

  selectedCurrency = this.currencyList[0];
  searchCurrency = '';

  get filteredCurrencyList() {
    if (!this.searchCurrency) {
      return this.currencyList;
    }
    return this.currencyList.filter(c =>
      c.name.toLowerCase().includes(this.searchCurrency.toLowerCase())
    );
  }

  selectCurrency(currency: any) {
    this.selectedCurrency = currency;
    this.dropdownOpen = null;
    this.searchCurrency = '';
    this.resetInputs();
  }

  priceTypes = [
    {
      label: 'Giá cố định',
      description: 'Giá của bạn vẫn cố định và sẽ không bị ảnh hưởng bởi biến động thị trường'
    },
    {
      label: 'Giá thả nổi',
      description: 'Giá của bạn sẽ biến động tùy vào giá thị trường và mức ký quỹ bạn đặt.'
    }
  ];

  selectedPriceType = this.priceTypes[0];

  selectPriceType(option: any) {
    this.selectedPriceType = option;
    this.dropdownOpen = null;
  }

  marketOptions = [
    {
      label: 'Công khai',
      description: 'Quảng cáo công khai sẽ xuất hiện trên sàn giao dịch P2P'
    },
    {
      label: 'Riêng tư',
      description: 'Quảng cáo riêng tư sẽ không xuất hiện trên sàn giao dịch P2P. Nếu muốn nhận được lệnh, bạn cần chia sẻ quảng cáo.'
    }
  ];

  selectedMarket = this.marketOptions[1]; // Mặc định: Riêng tư

  selectMarket(option: any) {
    this.selectedMarket = option;
    this.dropdownOpen = null;
  }

  price: number | null = null;
  amount: number | null = null;

  minLimit: number | null = null;
  maxLimit: number | null = null;

  selectedCrypto = { symbol: 'USDT', name: 'Tether' };

  resetInputs() {
    this.price = null;
    this.amount = null;
    this.minLimit = null;
    this.maxLimit = null;
  }

  validateInput(field: 'price' | 'amount' | 'minLimit' | 'maxLimit', value: string) {
    if (value === null || value === undefined) {
      (this as any)[field] = null;
      return;
    }

    let sanitizedValue = String(value).replace(/[^0-9.]/g, '');

    const parts = sanitizedValue.split('.');
    if (parts.length > 2) {
      sanitizedValue = parts[0] + '.' + parts.slice(1).join('');
    }

    const numericValue = parseFloat(sanitizedValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      (this as any)[field] = numericValue;
    } else if (sanitizedValue === '') {
      (this as any)[field] = null;
    }

    // This is a bit of a hack to force the view to update
    // if the user enters invalid characters that are stripped.
    // We set it to a slightly different value to trigger change detection.
    if (String((this as any)[field]) !== sanitizedValue && (this as any)[field] !== null) {
      setTimeout(() => {
        const currentVal = (this as any)[field];
        (this as any)[field] = null;
        setTimeout(() => (this as any)[field] = currentVal, 0);
      }, 0);
    }
  }

  NextStepPage() {
    this.router.navigate(['/create-ads/nextstep']), {
    }
  }

  get isFormValid(): boolean {
    return (
      this.selectedCoin &&
      this.selectedCurrency &&
      this.selectedPriceType &&
      this.selectedMarket &&
      this.price !== null && this.price > 0 &&
      this.amount !== null && this.amount > 0 &&
      this.minLimit !== null && this.minLimit > 0 &&
      this.maxLimit !== null && this.maxLimit > 0 &&
      this.minLimit !== null && this.maxLimit !== null && this.minLimit < this.maxLimit
    );
  }
}
