import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SummaryComponent } from '../summary/summary.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-convert-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule, SummaryComponent, HistoryComponent],
  templateUrl: './convert-wallet.component.html',
  styleUrls: ['./convert-wallet.component.css']
})
export class ConvertWalletComponent {
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

  step = 1;
  selectedFromCoin: any = null;
  selectedToCoin: any = null;
  showFromDropdown: boolean = false;
  showToDropdown: boolean = false;
  searchFromQuery: string = '';
  searchToQuery: string = '';
  amountFrom: number | null = null;
  amountTo: number | null = null;
  exchangeRate: number = 0.0002;

  totalValue: number = 2000; // Added to bind with app-summary
  isHidden: boolean = false; // Added to bind with app-summary
  fundingHistory: Array<{
    description: string;
    amount: number;
    token: string;
    time: string;
    date: string;
  }> = [
    {
      description: 'Chuyển đổi USDT sang BTC',
      amount: 1000,
      token: 'USDT',
      time: '10:55',
      date: '2025-08-07'
    },
    {
      description: 'Chuyển đổi ETH sang USDT',
      amount: 0.5,
      token: 'ETH',
      time: '09:45',
      date: '2025-08-07'
    }
  ]; // Added to bind with app-history

  coins = [
    { symbol: 'USDT', name: 'Tether', img: 'usdt.png' },
    { symbol: 'BTC', name: 'Bitcoin', img: 'btc.png' },
    { symbol: 'ETH', name: 'Ethereum', img: 'eth.png' },
    { symbol: 'PI', name: 'Pi Network', img: 'pi.png' }
  ];

  constructor(private router: Router, private toastr: ToastrService) {}

  toggleHidden() {
    this.isHidden = !this.isHidden;
  }

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false;
  }

  toggleToDropdown() {
    if (this.step < 2) return;
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false;
  }

  selectFromCoin(coin: any) {
    if (this.selectedToCoin && this.selectedToCoin.symbol === coin.symbol) {
      this.toastr.error('Không thể chọn hai coin giống nhau', 'Lỗi');
      return;
    }
    this.selectedFromCoin = coin;
    this.showFromDropdown = false;
    if (!this.selectedToCoin) this.step = 2;
    this.calculateAmountTo();
  }

  selectToCoin(coin: any) {
    if (this.selectedFromCoin && this.selectedFromCoin.symbol === coin.symbol) {
      this.toastr.error('Không thể chọn hai coin giống nhau', 'Lỗi');
      return;
    }
    this.selectedToCoin = coin;
    this.showToDropdown = false;
    if (this.selectedFromCoin) this.step = 3;
    this.calculateAmountTo();
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
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      (coin.img && coin.img.toLowerCase().includes(this.searchFromQuery.toLowerCase()))
    );
  }

  filteredToCoins() {
    return this.coins.filter(coin =>
      coin.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      (coin.img && coin.img.toLowerCase().includes(this.searchToQuery.toLowerCase()))
    );
  }

  calculateAmountTo() {
    if (this.selectedFromCoin && this.selectedToCoin && this.amountFrom !== null && this.amountFrom > 0) {
      this.amountTo = this.amountFrom * this.exchangeRate;
    } else {
      this.amountTo = null;
    }
  }

  calculateAmountFrom() {
    if (this.selectedFromCoin && this.selectedToCoin && this.amountTo !== null && this.amountTo > 0 && this.exchangeRate > 0) {
      this.amountFrom = this.amountTo / this.exchangeRate;
    } else {
      this.amountFrom = null;
    }
  }

  navigateToRecharge() {
    this.router.navigate(['/funding-wallet/recharge']);
  }

  navigateToConvert() {
    this.router.navigate(['/funding-wallet/convert']);
  }

  navigateToWithdrawal() {
    this.router.navigate(['/funding-wallet/withdrawal']);
  }

  navigateToTransfer() {
    this.router.navigate(['/funding-wallet/transfer']);
  }
}