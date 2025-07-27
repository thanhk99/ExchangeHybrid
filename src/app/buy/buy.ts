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

  dropdownOpen1 = false; // cho ô 1
  dropdownOpen2 = false; // cho ô 2

  // Mapping from currency code to country code
  currencyToCountryCode: { [key: string]: string } = {
    'VND': 'VN',
    'USD': 'US',
    'AED': 'AE',
    'ARS': 'AR',
    'ALL': 'AL',
    'AMD': 'AM',
    'ANG': 'AN',
    // Add more mappings as needed
  };

  fiatCurrencies = Object.keys(this.currencyToCountryCode).map(code => ({
    code: code,
    icon: this.getFlagIcon(this.currencyToCountryCode[code])
  }));

  cryptoCurrencies = [
    { code: 'USDT', icon: 'usdt.png' },
    { code: 'USDC', icon: 'usdc.png' },
    { code: 'BTC', icon: 'btc.png' },
    { code: 'ETH', icon: 'eth.png' },
    { code: 'TON', icon: 'ton.png' }
  ];

  // Giá trị hiện tại
  selectedPay = { code: 'VND', icon: this.getFlagIcon('VN') };
  selectedReceive = { code: 'USDT', icon: 'usdt.png' };

  searchTerm1: string = '';
  searchTerm2: string = '';

  amountPay: number | null = null;
  amountReceive: number | null = null;
  isFormValid: boolean = false;

  // API-driven data
  exchangeRate: number = 26361; // Default value, will be updated from API
  availableBalance: number = 0;
  transactionLimit = { min: 130000, max: 2600000000 }; // Default values

  ngOnInit(): void {
    this.loadInitialData();
    this.updateFormValidity();
  }

  loadInitialData() {
    // 1. Get exchange rate
    // Assuming the API needs the coin pair, e.g., { from: 'USDT', to: 'VND' }
    // This needs to be adjusted based on the actual API requirement for getCoinRate
    this.apiService.getCoinRate({ coinName: 'USDT' }).subscribe(data => {
      // Assuming the API returns a price field, e.g., data.price
      if (data && data.price) {
        this.exchangeRate = data.price;
      }
    });

    // 2. Get user profile for available balance
    this.apiService.getUserProfile().subscribe(profile => {
      // Assuming profile has a fundingWallet with a balance field
      // e.g., profile.fundingWallet.balance
      if (profile && profile.fundingWallet) {
        this.availableBalance = profile.fundingWallet.balance;
      }
    });

    // 3. Get P2P ads for transaction limits
    this.apiService.getP2PAds().subscribe(ads => {
      // Logic to find the best ad and its limits
      // For now, we'll just use the first ad's limits as an example
      if (ads && ads.length > 0) {
        const firstAd = ads[0];
        // Assuming ad has 'minAmount' and 'maxAmount' fields
        this.transactionLimit.min = firstAd.minAmount;
        this.transactionLimit.max = firstAd.maxAmount;
      }
    });
  }

  switchTab(tab: 'buy' | 'sell') {
    this.activeTab = tab;

    if (tab === 'buy') {
      this.selectedPay = { code: 'VND', icon: this.getFlagIcon('VN') };
      this.selectedReceive = { code: 'USDT', icon: 'usdt.png' };
    } else {
      this.selectedPay = { code: 'USDT', icon: 'usdt.png' };
      this.selectedReceive = { code: 'VND', icon: this.getFlagIcon('VN') };
    }

    this.amountPay = null;
    this.amountReceive = null;
    this.searchTerm1 = '';
    this.searchTerm2 = '';

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
    this.searchTerm1 = '';
    this.searchTerm2 = '';
  }

  getFlagIcon(countryCode: string) {
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
  }

  getPayList() {
    const list = this.activeTab === 'buy' ? this.fiatCurrencies : this.cryptoCurrencies;
    if (!this.searchTerm1) {
      return list;
    }
    return list.filter(c => c.code.toLowerCase().includes(this.searchTerm1.toLowerCase()));
  }

  getReceiveList() {
    const list = this.activeTab === 'buy' ? this.cryptoCurrencies : this.fiatCurrencies;
    if (!this.searchTerm2) {
      return list;
    }
    return list.filter(c => c.code.toLowerCase().includes(this.searchTerm2.toLowerCase()));
  }

  onSearch(which: number, value: string) {
    if (which === 1) {
      this.searchTerm1 = value;
    } else {
      this.searchTerm2 = value;
    }
  }

  onAmountPayChange(value: string) {
    const numericValue = parseFloat(value);
    if (!value || isNaN(numericValue) || numericValue <= 0) {
      this.amountPay = null;
      this.amountReceive = null;
    } else {
      this.amountPay = numericValue;
      this.amountReceive = this.activeTab === 'buy'
        ? +(this.amountPay / this.exchangeRate).toFixed(2)
        : +(this.amountPay * this.exchangeRate).toFixed(0);
    }

    this.updateFormValidity();
  }

  onAmountReceiveChange(value: string) {
    const numericValue = parseFloat(value);
    if (!value || isNaN(numericValue) || numericValue <= 0) {
      this.amountReceive = null;
      this.amountPay = null;
    } else {
      this.amountReceive = numericValue;
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
