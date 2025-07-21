import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-wallet',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent {
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

  showFromDropdown = false;
  showToDropdown = false;
  selectedFromAccount: any = null;
  selectedToAccount: any = null;
  searchFromQuery = '';
  searchToQuery = '';
  amountFrom: number = 0; 

  accountList = [
    { name: 'Ví Funding', img: 'assets/icons/funding.png' },
    { name: 'Ví Giao dịch', img: 'assets/icons/trading.png' },
    { name: 'Ví Tiết kiệm', img: 'assets/icons/savings.png' }
  ];

  constructor(private router: Router) {}

  toggleFromDropdown() {
    this.showFromDropdown = !this.showFromDropdown;
    this.showToDropdown = false; 
  }

  toggleToDropdown() {
    if (this.step < 2) return;
    this.showToDropdown = !this.showToDropdown;
    this.showFromDropdown = false;
  }

  selectFromAccount(account: any) {
    this.selectedFromAccount = account;
    this.showFromDropdown = false;
    this.step = 2;
  }

  selectToAccount(account: any) {
    this.selectedToAccount = account;
    this.showToDropdown = false;
    this.step = 3;
  }

  filteredFromAccounts() {
    return this.accountList.filter(a =>
      a.name.toLowerCase().includes(this.searchFromQuery.toLowerCase()) ||
      (a.img && a.img.toLowerCase().includes(this.searchFromQuery.toLowerCase()))
    );
  }

  filteredToAccounts() {
    return this.accountList.filter(a =>
      a.name.toLowerCase().includes(this.searchToQuery.toLowerCase()) ||
      (a.img && a.img.toLowerCase().includes(this.searchToQuery.toLowerCase()))
    );
  }

  goBack() {
    this.router.navigate(['/funding-wallet']);
  }
}