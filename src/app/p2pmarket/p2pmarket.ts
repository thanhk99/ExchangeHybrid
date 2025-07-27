import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-p2pmarket',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './p2pmarket.html',
  styleUrl: './p2pmarket.css'
})
export class P2pmarket implements OnInit {
  constructor(
    private _eref: ElementRef,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds() {
    this.apiService.getP2PAds().subscribe(data => {
      if (data && Array.isArray(data)) {
        // Assuming the ad object has a 'type' property ('BUY' or 'SELL')
        // and other properties that match the hardcoded structure.
        // You might need to map the response from the API to fit the frontend model.
        this.buyAds = data.filter(ad => ad.type === 'BUY').map(this.mapAdData);
        this.sellAds = data.filter(ad => ad.type === 'SELL').map(this.mapAdData);
      }
    });
  }

  // Helper to map API response to frontend model
  mapAdData(ad: any) {
    return {
      id: ad.id, // Make sure to get the ad ID
      name: ad.user?.username || 'Unknown User', // Example of safe navigation
      trades: ad.user?.tradeCount || 0,
      successRate: `${ad.user?.completionRate || 0}%`,
      satisfaction: '99%', // Placeholder
      price: ad.price,
      available: ad.availableAmount,
      range: `${ad.minAmount}-${ad.maxAmount}`,
      bank: ad.paymentMethods.join(', '), // Assuming paymentMethods is an array of strings
      time: '', // Placeholder
    };
  }

  buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: 'my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },

  ];

  buyAds: any[] = [];
  sellAds: any[] = [];

  activeTab: 'buy' | 'sell' = 'buy';

  get adsToShow() {
    return this.activeTab === 'buy' ? this.buyAds : this.sellAds;
  }

  dropdownOpen: string | null = null;

  coinList = [
    { name: 'USDT', icon: '/coin.png' },
    { name: 'USDC', icon: '/coin.png' },
    { name: 'BTC', icon: '/coin.png' },
    { name: 'ETH', icon: '/coin.png' },
    { name: 'TON', icon: '/coin.png' }
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

  @HostListener('document:click')
  handleClickOutside() {
    this.dropdownOpen = null;
  }

  currencyList = [
    { name: 'VND', icon: '/coin.png' },
    { name: 'AED', icon: '/coin.png' },
    { name: 'ALL', icon: '/coin.png' },
    { name: 'AMD', icon: '/coin.png' },
    { name: 'ANG', icon: '/coin.png' },
    { name: 'ARS', icon: '/coin.png' },
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

  CreateAdsPage() {
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
    if (!this.selectedAd) return;

    const orderData = {
      adId: this.selectedAd.id,
      amount: this.activeTab === 'buy' ? this.inputBuyAmount : this.sellAmount,
      paymentMethod: this.selectedBankMethod,
      // Add any other required fields for the TransactionAds model
    };

    this.apiService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully!', response);
        // Handle success (e.g., navigate to a transaction details page)
        this.showConfirmModal = false;
        // Maybe show a success toastr
      },
      error: (error) => {
        console.error('Error placing order:', error);
        // Handle error (e.g., show an error message)
        this.showConfirmModal = false;
      }
    });
  }


}
