import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';


@Component({
  selector: 'app-my-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './my-transaction.html',
  styleUrl: './my-transaction.css'
})
export class MyTransaction {

  buytabs = [
    { label: 'Giao dịch nhanh', path: '/buy' },
    { label: 'Giao dịch P2P', path: '/p2pmarket' },
    { label: 'Giao dịch Lô', path: '/big-transaction' },
    { label: 'Lệnh của tôi', path: '/my-transaction' },
    { label: 'Hồ sơ của tôi', path: '/my-profile' },
    { label: 'Thêm', path: '' },
    
  ];

  tab: 'pending' | 'completed' = 'pending';

  openDropdown: 'status' | 'order' | null = null;

  selectedStatus = '';
  selectedOrder = '';
  startDate = '2025-01-04';
  endDate = '2025-07-04';
  searchTerm = '';

  orders = []; // Dữ liệu thực sẽ lấy từ API

 

  constructor() {
    // this.filterOrders();
  }

  setTab(tab: 'pending' | 'completed') {
    this.tab = tab;
    // this.filterOrders();
  }

  toggleDropdown(type: 'status' | 'order') {
    this.openDropdown = this.openDropdown === type ? null : type;
  }

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.openDropdown = null;
    this.filterOrders();
  }

  selectOrder(order: string) {
    this.selectedOrder = order;
    this.openDropdown = null;
    this.filterOrders();
  }

  resetFilters() {
    this.selectedStatus = '';
    this.selectedOrder = '';
    this.searchTerm = '';
    this.startDate = '2025-01-04';
    this.endDate = '2025-07-04';
    this.filterOrders();
  }

  filterOrders() {
    // Tạm thời không có dữ liệu → trả về mảng rỗng
    this.filteredOrders = [];
  }

  reportUser() {
    alert('Đã gửi báo cáo người dùng');
  }

  exportReport() {
    alert('Đã xuất báo cáo');
  }

  completedOrders = [
  {
    id: '250630132051631',
    type: 'Mua',
    amount: 5.00,
    totalPrice: 132000,
    price: 26360,
    partner: 'NamMôADiĐàPhật 🪷',
    status: 'Đã huỷ',
    time: '12:20:52 30/06/2025'
  },
  {
    id: '250627224434535',
    type: 'Mua',
    amount: 5.03,
    totalPrice: 133333,
    price: 26470,
    partner: 'Lexus570 💎',
    status: 'Đã huỷ',
    time: '21:44:34 27/06/2025'
  },
  {
    id: '250627224434535',
    type: 'Mua',
    amount: 5.03,
    totalPrice: 133333,
    price: 26470,
    partner: 'Lexus570 💎',
    status: 'Đã huỷ',
    time: '21:44:34 27/06/2025'
  },
  {
    id: '250627224434535',
    type: 'Mua',
    amount: 5.03,
    totalPrice: 133333,
    price: 26470,
    partner: 'Lexus570 💎',
    status: 'Đã huỷ',
    time: '21:44:34 27/06/2025'
  },
  {
    id: '250627224434535',
    type: 'Mua',
    amount: 5.03,
    totalPrice: 133333,
    price: 26470,
    partner: 'Lexus570 💎',
    status: 'Đã huỷ',
    time: '21:44:34 27/06/2025'
  }
];


  hasCompletedData(): boolean {
  return this.tab === 'completed' && this.completedOrders.length > 0;
}

noCompletedData(): boolean {
  return this.tab === 'completed' && this.completedOrders.length === 0;
}

filteredOrders = [
  {
    id: '250704234500484',
    type: 'Mua',
    amount: 5.00,
    totalPrice: 132000,
    price: 26360,
    partner: 'NamMôADiĐàPhật 🪷',
    status: 'Đang chờ thanh toán',
    remainingTime: '09:50',
    time: '22:45:00 04/07/2025'
  },
  {
    id: '250704234500484',
    type: 'Mua',
    amount: 5.00,
    totalPrice: 132000,
    price: 26360,
    partner: 'NamMôADiĐàPhật 🪷',
    status: 'Đang chờ thanh toán',
    remainingTime: '09:50',
    time: '22:45:00 04/07/2025'
  },
  {
    id: '250704234500484',
    type: 'Mua',
    amount: 5.00,
    totalPrice: 132000,
    price: 26360,
    partner: 'NamMôADiĐàPhật 🪷',
    status: 'Đang chờ thanh toán',
    remainingTime: '09:50',
    time: '22:45:00 04/07/2025'
  },
  {
    id: '250704234500484',
    type: 'Mua',
    amount: 5.00,
    totalPrice: 132000,
    price: 26360,
    partner: 'NamMôADiĐàPhật 🪷',
    status: 'Đang chờ thanh toán',
    remainingTime: '09:50',
    time: '22:45:00 04/07/2025'
  }
];

hasPendingOrders(): boolean {
  return this.tab === 'pending' && this.filteredOrders.length > 0;
}

noPendingOrders(): boolean {
  return this.tab === 'pending' && this.filteredOrders.length === 0;
}

}
