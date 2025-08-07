import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-p2pmarket',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './p2pmarket.html',
  styleUrl: './p2pmarket.css'
})
export class P2pmarket implements OnInit {

  constructor(
    private _eref: ElementRef,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // this.loadAds();
  }

  // loadAds() {
  //   // For now, we fetch all ads. Later, this could be a specific endpoint
  //   // or include a filter for large transactions.
  //   this.apiService.getP2PAds().subscribe(data => {
  //     if (data && Array.isArray(data)) {
  //       // You might want to add a filter here for what constitutes a "big transaction"
  //       // For example: .filter(ad => ad.maxAmount > SOME_THRESHOLD)
  //       this.buyAds = data.filter(ad => ad.type === 'BUY').map(this.mapAdData);
  //       this.sellAds = data.filter(ad => ad.type === 'SELL').map(this.mapAdData);
  //     }
  //   });
  // }

  // // Helper to map API response to frontend model
  // mapAdData(ad: any) {
  //   return {
  //     id: ad.id,
  //     name: ad.user?.username || 'Unknown User',
  //     trades: ad.user?.tradeCount || 0,
  //     successRate: `${ad.user?.completionRate || 0}%`,
  //     satisfaction: '99%', // Placeholder
  //     price: ad.price,
  //     available: ad.availableAmount,
  //     range: `${ad.minAmount}-${ad.maxAmount}`,
  //     bank: ad.paymentMethods.join(', '),
  //     time: '', // Placeholder
  //   };
  // }

  buyAds: any[] = [
    {
      id: 1,
      name: 'RẻNhấtThếGiới',
      trades: 8361,
      successRate: '99.7%',
      satisfaction: '99%',
      price: 26409,
      available: 686.29,
      range: '2.000.000-18.124.232',
      paymentMethods: ['Chuyển khoản ngân hàng'],
      time: '',
    },
    {
      id: 2,
      name: 'NamMôADiĐàPhật',
      trades: 97024,
      successRate: '99.91%',
      satisfaction: '99%',
      price: 26410,
      available: 2565.87,
      range: '132.000-132.000',
      paymentMethods: ['Chuyển khoản ngân hàng', 'Vietcombank – NH Ngoại thương VN'],
      time: '',
    },
    {
      id: 3,
      name: '$ONDAY',
      trades: 2286,
      successRate: '99.65%',
      satisfaction: '99%',
      price: 26410,
      available: 907.42,
      range: '20.000.000-23.964.962',
      paymentMethods: ['Chuyển khoản ngân hàng'],
      time: '',
    }
  ];
  sellAds: any[] = [
    {
      id: 4,
      name: 'BINUSDT',
      trades: 11137,
      successRate: '97.57%',
      satisfaction: '99%',
      price: 26427,
      available: 0,
      range: '20.000.000-24.209.246',
      paymentMethods: ['Chuyển khoản ngân hàng'],
      time: '',
    }
  ];

  activeTab: 'buy' | 'sell' = 'buy';

  get adsToShow() {
    return this.activeTab === 'buy' ? this.buyAds : this.sellAds;
  }

  dropdownOpen: string | null = null;
  amountInputFocused = false;

  coinList = [
    { name: 'USDT', icon: '/usdt.png' },
    { name: 'USDC', icon: '/usdc.png' },
    { name: 'BTC', icon: '/btc.png' },
    { name: 'ETH', icon: '/eth.png' },
    { name: 'TON', icon: '/ton.png' }
  ];

  selectedCoin = this.coinList[0];
  searchCoin = '';

  toggleDropdown(type: string) {
    if (this.dropdownOpen === type) {
      this.dropdownOpen = null;
      if (type === 'coin') {
        this.searchCoin = '';
      } else if (type === 'currency') {
        this.searchCurrency = '';
      } else if (type === 'bank') {
        this.searchBank = '';
      }
    } else {
      this.dropdownOpen = type;
    }
  }

  selectCoin(coin: any) {
    this.selectedCoin = coin;
    this.dropdownOpen = null;
    this.searchCoin = '';
  }

  get filteredCoinList() {
    if (!this.searchCoin) {
      return this.coinList;
    }
    return this.coinList.filter(coin =>
      coin.name.toLowerCase().includes(this.searchCoin.toLowerCase())
    );
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (this.dropdownOpen) {
      this.dropdownOpen = null;
      this.searchCoin = '';
      this.searchCurrency = '';
      this.searchBank = '';
    }
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
  }

  onSearch(type: 'coin' | 'currency' | 'payment', value: string) {
    if (type === 'coin') {
      this.searchCoin = value;
    } else if (type === 'currency') {
      this.searchCurrency = value;
    } else if (type === 'payment') {
      this.searchPayment = value;
    }
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

    if (
      this.paymentMethods.find(p => p.name === 'Tất cả phương thức')?.selected ||
      selectedMethods.length === 0
    ) {
      return ads;
    }

    return ads.filter(ad =>
      selectedMethods.some(method => ad.paymentMethods.includes(method))
    );
  }

  togglePaymentSelection(method: any) {
    if (method.name === 'Tất cả phương thức') {
      method.selected = true;
      this.paymentMethods.forEach(p => {
        if (p.name !== 'Tất cả phương thức') p.selected = false;
      });
    } else {
      method.selected = !method.selected;
      const allMethod = this.paymentMethods.find(p => p.name === 'Tất cả phương thức');
      if (allMethod) allMethod.selected = false;
    }
    // Không đóng dropdown vì có thể chọn nhiều phương thức
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

  calculateReceiveAmount(): number {
    if (!this.selectedAd || !this.inputAmount) return 0;
    return +(this.inputAmount / this.selectedAd.price).toFixed(6);
  }

  onAmountChange(): void {
    if (this.inputAmount < 0) {
      this.inputAmount = 0;
    }
  }

  showBuyModal: boolean = false;
  selectedBankMethod: string | null = null;
  searchBank: string = '';
  inputBuyAmount: number = 0;

  get availableBankMethods(): string[] {
    if (!this.selectedAd) return [];
    return this.selectedAd.paymentMethods;
  }

  filteredBankMethods(): string[] {
    return this.availableBankMethods.filter(method =>
      method.toLowerCase().includes(this.searchBank.toLowerCase())
    );
  }

  selectBankMethod(method: string) {
    this.selectedBankMethod = method;
    this.dropdownOpen = null;
    this.searchBank = '';
  }

  calculateReceiveBuyAmount(): number {
    if (!this.selectedAd || !this.inputBuyAmount) return 0;
    return +(this.inputBuyAmount / this.selectedAd.price).toFixed(6);
  }

  onBuyAmountChange(): void {
    if (this.inputBuyAmount < 0) {
      this.inputBuyAmount = 0;
    }
  }

  openBuyModal(ad: any) {
    this.selectedAd = ad;
    this.inputBuyAmount = 0;
    this.sellAmount = 0;
    this.selectedBankMethod = ad.paymentMethods[0]; // Tự động chọn phương thức đầu tiên
    this.searchBank = '';
    this.showBuyModal = true;
    this.dropdownOpen = null;

    // Reset countdown
    this.countdown = 45;
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
    this.inputBuyAmount = 0;
    this.sellAmount = 0;
    this.selectedBankMethod = null;
    this.searchBank = '';
    this.dropdownOpen = null;
    clearInterval(this.countdownInterval);
  }

  onModalClick(event: Event) {
    const target = event.target as HTMLElement;
    const bankDropdown = target.closest('.bank-dropdown');

    // Nếu click trong modal mà không phải từ dropdown bank, đóng dropdown
    if (this.dropdownOpen === 'bank' && !bankDropdown) {
      this.dropdownOpen = null;
      this.searchBank = '';
    }
  }


  countdown: number = 45;
  countdownInterval: any;

  sellAmount: number = 0;

  onSellAmountChange(): void {
    if (this.sellAmount < 0) {
      this.sellAmount = 0;
    }
  }

  get isBankMatched(): boolean {
    if (!this.selectedAd || !this.selectedBankMethod) return false;
    return this.selectedAd.paymentMethods.includes(this.selectedBankMethod);
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

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.showBuyModal = true;
  }

  // Modal Thêm phương thức thanh toán
  showPaymentMethodModal: boolean = false;
  paymentForm: {
    accountName: string;
    accountNumber: number | null;
    bankName: string;
    branchName: string;
  } = {
      accountName: '',
      accountNumber: null,
      bankName: '',
      branchName: ''
    };

  get isPaymentFormValid(): boolean {
    return !!(
      this.paymentForm.accountName.trim() &&
      this.paymentForm.accountNumber !== null &&
      this.paymentForm.bankName.trim() &&
      this.paymentForm.branchName.trim()
    );
  }

  openPaymentMethodModal() {
    this.showPaymentMethodModal = true;
    this.showBuyModal = false;
  }

  closePaymentMethodModal() {
    this.showPaymentMethodModal = false;
    this.showBuyModal = true;
    // Reset form
    this.paymentForm = {
      accountName: '',
      accountNumber: null,
      bankName: '',
      branchName: ''
    };
  }

  savePaymentMethod() {
    if (this.isPaymentFormValid) {
      // Thêm phương thức thanh toán mới vào danh sách
      const newMethod = `${this.paymentForm.bankName} - ${this.paymentForm.branchName}`;

      // Thêm vào danh sách payment methods nếu chưa có
      if (!this.paymentMethods.find(p => p.name === newMethod)) {
        this.paymentMethods.push({ name: newMethod, selected: false });
      }

      // Chọn phương thức mới
      this.selectedBankMethod = newMethod;

      // Đóng modal và quay lại modal mua/bán
      this.closePaymentMethodModal();
    }
  }



  submitOrder() {
    if (!this.selectedAd) return;

    const orderData = {
      adId: this.selectedAd.id,
      amount: this.activeTab === 'buy' ? this.inputBuyAmount : this.sellAmount,
      paymentMethod: this.selectedBankMethod,
    };

    this.apiService.placeOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order placed successfully!', response);
        this.showConfirmModal = false;
        this.closeBuyModal(); // Reset all data after successful submission
      },
      error: (error) => {
        console.error('Error placing order:', error);
        this.showConfirmModal = false;
      }
    });
  }
}
