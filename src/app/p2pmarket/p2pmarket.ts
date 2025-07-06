import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-p2pmarket',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './p2pmarket.html',
  styleUrl: './p2pmarket.css'
})
export class P2pmarket {
 constructor(
  private _eref: ElementRef,
  private router: Router
 ) {
  }

   buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: 'my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },
    
  ];

  buyAds = [
    {
      name: 'NamMôADiĐàPhật',
      trades: 87345,
      successRate: '99.91%',
      satisfaction: '99.46%',
      price: 26360,
      available: 1.645,
      range: '132.000-132.000',
      bank: 'Vietcombank – NH Ngoại thương VN',
      time: '',
    },
    {
      name: 'Nhanh-UyTin247',
      trades: 490,
      successRate: '97.22%',
      satisfaction: '98.57%',
      price: 26405,
      available: 3.000,
      range: '1.000.000-79.215.000',
      bank: 'Chuyển khoản ngân hàng',
      time: '',
    },
    {
      name: 'CáMậpCon247',
      trades: 1067,
      successRate: '96.91%',
      satisfaction: '94.89%',
      price: 26419,
      available: 65.01,
      range: '200.000-1.717.499',
      bank: 'Chuyển khoản ngân hàng',
      time: '',
    },
    {
      name: 'UyênNhi_P2P',
      trades: 6814,
      successRate: '99.27%',
      satisfaction: '98.53%',
      price: 26420,
      available: 42.58,
      range: '1.000.000-1.124.963',
      bank: 'Chuyển khoản ngân hàng',
      time: '',
    }
  ];

  activeTab: 'buy' | 'sell' = 'buy';
 
  sellAds = [
    {
      name: 'EmMe-GdNhanh',
      trades: 8542,
      successRate: '98.98%',
      satisfaction: '95.44%',
      price: 26409,
      available: 378.95,
      range: '10.000.000-10.007.690',
      bank: 'Chuyển khoản ngân hàng',
      time: '15 phút'
    },
    {
      name: 'PhucSang_PTDân',
      trades: 14255,
      successRate: '100%',
      satisfaction: '99.25%',
      price: 26408,
      available: 4212.04,
      range: '99.999.999-111.231.552',
      bank: 'Chuyển khoản ngân hàng',
      time: '10 phút'
    },
    {
      name: 'EmMe-GdNhanh',
      trades: 8542,
      successRate: '98.98%',
      satisfaction: '95.44%',
      price: 26409,
      available: 378.95,
      range: '10.000.000-10.007.690',
      bank: 'Chuyển khoản ngân hàng',
      time: '15 phút'
    },
    {
      name: 'EmMe-GdNhanh',
      trades: 8542,
      successRate: '98.98%',
      satisfaction: '95.44%',
      price: 26409,
      available: 378.95,
      range: '10.000.000-10.007.690',
      bank: 'Chuyển khoản ngân hàng',
      time: '15 phút'
    },
    
  ];

  get adsToShow() {
    return this.activeTab === 'buy' ? this.buyAds : this.sellAds;
  }
  
  dropdownOpen: string | null = null;

coinList = [
  { name: 'USDT', icon: '' },
  { name: 'USDC', icon: '' },
  { name: 'BTC', icon: '' },
  { name: 'ETH', icon: '' },
  { name: 'TON', icon: '' }
];

selectedCoin = this.coinList[0];
searchCoin = '';

toggleDropdown(type: string) {
  this.dropdownOpen = this.dropdownOpen === type ? null : type;
}

selectCoin(coin: any) {
  this.selectedCoin = coin;
  this.dropdownOpen = null;
}

filteredCoinList() {
  return this.coinList.filter(coin =>
    coin.name.toLowerCase().includes(this.searchCoin.toLowerCase())
  );
}

@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  if (!this._eref.nativeElement.contains(event.target as Node)) {
    this.dropdownOpen = null;
  }
}

currencyList = [
  { name: 'VND', icon: '' },
  { name: 'AED', icon: '' },
  { name: 'ALL', icon: '' },
  { name: 'AMD', icon: '' },
  { name: 'ANG', icon: '' },
  { name: 'ARS', icon: '' },
];

selectedCurrency = this.currencyList[0];
searchCurrency = '';

filteredCurrencyList() {
  return this.currencyList.filter(c =>
    c.name.toLowerCase().includes(this.searchCurrency.toLowerCase())
  );
}

selectCurrency(currency: any) {
  this.selectedCurrency = currency;
  this.dropdownOpen = null;
}

paymentMethods = [
  { name: 'Tất cả phương thức', selected: true }, 
  { name: 'Chuyển khoản ngân hàng', selected: false },
  { name: 'VPBank – NH Việt Nam Thịnh Vượng', selected: false },
  { name: 'Techcombank – NH Kỹ Thương', selected: false },
  { name: 'MB Bank – NH Quân Đội', selected: false },
];
searchPayment = '';
selectAllPayments = false;

filteredPaymentMethods() {
  return this.paymentMethods.filter(m =>
    m.name.toLowerCase().includes(this.searchPayment.toLowerCase())
  );
}

toggleSelectAllPayments() {
  this.paymentMethods.forEach(m => m.selected = this.selectAllPayments);
}

getSelectedPaymentLabel() {
  const selected = this.paymentMethods.filter(m => m.selected);
  if (this.selectAllPayments || selected.length === 0) return 'Tất cả phương thức';
  return selected.map(m => m.name).join(', ');
}

  get filteredAdsToShow() {
  const ads = this.activeTab === 'buy' ? this.buyAds : this.sellAds;

  const selectedMethods = this.paymentMethods
    .filter(p => p.selected && p.name !== 'Tất cả phương thức')
    .map(p => p.name);

  // Nếu chọn "Tất cả phương thức" hoặc không chọn gì thì trả lại toàn bộ
  if (
    this.paymentMethods.find(p => p.name === 'Tất cả phương thức')?.selected ||
    selectedMethods.length === 0
  ) {
    return ads;
  }

  // Lọc theo các phương thức được chọn
  return ads.filter(ad =>
    selectedMethods.some(method => ad.bank.includes(method))
  );
}

  togglePaymentSelection(method: any) {
  if (method.name === 'Tất cả phương thức') {
    // Chọn tất cả => bỏ chọn các method khác
    method.selected = true;
    this.paymentMethods.forEach(p => {
      if (p.name !== 'Tất cả phương thức') p.selected = false;
    });
  } else {
    // Chọn từng ngân hàng => bỏ chọn "Tất cả phương thức"
    method.selected = !method.selected;
    const allMethod = this.paymentMethods.find(p => p.name === 'Tất cả phương thức');
    if (allMethod) allMethod.selected = false;
  }
}

  sortOptions = [
  { label: 'Giá: tăng dần', value: 'price_asc' },
  { label: 'Tổng số lệnh đã hoàn tất', value: 'trades' },
  { label: 'Tổng tỷ lệ hoàn tất', value: 'successRate' }
];

selectedSortOption: any = null;

selectSortOption(option: any) {
  this.selectedSortOption = option;
  this.dropdownOpen = null;
  this.sortAds();
}

// Sort theo lựa chọn 
sortAds() {
  const ads = this.activeTab === 'buy' ? this.buyAds : this.sellAds;

  if (!this.selectedSortOption) return; 

  switch (this.selectedSortOption.value) {
    case 'price_asc':
      ads.sort((a, b) => a.price - b.price);
      break;
    case 'trades':
      ads.sort((a, b) => b.trades - a.trades);
      break;
    case 'successRate':
      ads.sort((a, b) =>
        parseFloat(b.successRate) - parseFloat(a.successRate)
      );
      break;
  }
}

  CreateAdsPage(){
     this.router.navigate(['/create-ads']);
  }

selectedAd: any = null;
inputAmount: number = 0;

// openBuyModal(ad: any) {
//   this.selectedAd = ad;
//   this.inputAmount = 0; 
// }

// closeBuyModal() {
//   this.selectedAd = null;
// }

calculateReceiveAmount(): number {
  if (!this.selectedAd || !this.inputAmount) return 0;
  return +(this.inputAmount / this.selectedAd.price).toFixed(6);
}
  
showBuyModal: boolean = false;
selectedBankMethod: string | null = null;
searchBank: string = '';
inputBuyAmount: number = 0;

get availableBankMethods(): string[] {
  if (!this.selectedAd) return [];
  // Có thể chứa nhiều phương thức ngăn cách bởi dấu phẩy nếu muốn
  return [this.selectedAd.bank];
}

filteredBankMethods(): string[] {
  return this.availableBankMethods.filter(method =>
    method.toLowerCase().includes(this.searchBank.toLowerCase())
  );
}

selectBankMethod(method: string) {
  this.selectedBankMethod = method;
  this.dropdownOpen = null;
}

calculateReceiveBuyAmount(): number {
  if (!this.selectedAd || !this.inputBuyAmount) return 0;
  return +(this.inputBuyAmount / this.selectedAd.price).toFixed(6);
}

openBuyModal(ad: any) {
  this.selectedAd = ad;
  this.inputBuyAmount = 0;
  this.selectedBankMethod = null;
  this.searchBank = '';
  this.showBuyModal = true;
  this.dropdownOpen = null;

  clearInterval(this.countdownInterval);
  this.countdownInterval = setInterval(() => {
    if (this.countdown > 0) {
      this.countdown--;
    } else {
      clearInterval(this.countdownInterval);
    }
  }, 1000);
}

closeBuyModal() {
  this.showBuyModal = false;
  this.selectedAd = null;
    clearInterval(this.countdownInterval);
}


countdown: number = 45;
countdownInterval: any;

sellAmount: number = 0;

get isBankMatched(): boolean {
  if (!this.selectedAd || !this.selectedBankMethod) return false;
  return this.selectedAd.bank.includes(this.selectedBankMethod);
}

get isSellFormValid(): boolean {
  return (
    this.sellAmount > 0 &&
    this.isBankMatched
  );
}

get receiveAmount(): number {
  if (!this.selectedAd || !this.inputBuyAmount) return 0;
  return +(this.inputBuyAmount / this.selectedAd.price).toFixed(6);
}

get isBuyFormValid(): boolean {
  return (
    this.inputBuyAmount > 0 &&
    this.receiveAmount > 0 &&
    !!this.selectedBankMethod
  );
}

showConfirmModal: boolean = false;
openConfirmModal() {
  this.showBuyModal = false;
  this.showConfirmModal = true;
}

submitOrder() {
  this.showConfirmModal = false;

}


}
