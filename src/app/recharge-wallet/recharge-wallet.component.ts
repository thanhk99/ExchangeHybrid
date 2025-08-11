import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SummaryComponent } from '../summary/summary.component';
import { HistoryComponent } from '../history/history.component';

@Component({
  selector: 'app-recharge-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule, SummaryComponent, HistoryComponent],
  templateUrl: './recharge-wallet.component.html',
  styleUrls: ['./recharge-wallet.component.css']
})
export class RechargeWalletComponent {
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
  amount: number | null = null;
  showFromDropdown = false;
  showToDropdown = false;
  selectedFromCoin: any = null;
  selectedToNetwork: any = null;
  searchFromQuery = '';
  searchToQuery = '';

  totalValue: number = 3000; // Added to bind with app-summary
  isHidden: boolean = false; // Added to bind with app-summary
  fundingHistory: Array<{
    description: string;
    amount: number;
    token: string;
    time: string;
    date: string;
  }> = [
    {
      description: 'Nạp tiền USDT',
      amount: 100,
      token: 'USDT',
      time: '10:50',
      date: '2025-08-07'
    },
    {
      description: 'Nạp tiền BTC',
      amount: 0.05,
      token: 'BTC',
      time: '09:30',
      date: '2025-08-07'
    }
  ]; // Added to bind with app-history

  coinList = [
    { symbol: 'USDT', name: 'Tether', icon: 'usdt.png' },
    { symbol: 'BTC', name: 'Bitcoin', icon: 'btc.png' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'eth.png' },
    { symbol: 'PI', name: 'Pi Network', icon: 'pi.png' }
  ];

  networkList = [
    { name: 'Tron(TRC20)', min: '0.01 USDT', eta: '1 phút', icon: 'trc20.png' },
    { name: 'Ethereum', min: '0.01 USDT', eta: '7 phút', icon: 'eth.png' },
    { name: 'X Layer', min: '0.01 USDT', eta: '1 phút', icon: 'xlayer.png' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

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
      (c.icon && c.icon.toLowerCase().includes(this.searchFromQuery.toLowerCase()))
    );
  }

  filteredToCoins() {
    return this.networkList.filter(n =>
      n.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.min.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      n.eta.toLowerCase().includes(this.searchToQuery.toLowerCase())
    );
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