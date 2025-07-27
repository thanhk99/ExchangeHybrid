import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-my-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule, NavTabs, FormsModule],
  templateUrl: './my-transaction.html',
  styleUrl: './my-transaction.css'
})
export class MyTransaction implements OnInit {

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

  @HostListener('document:click')
  onDocumentClick() {
    this.openDropdown = null;
  }

  selectedStatus = '';
  selectedOrder = '';
  startDate = '2025-01-04';
  endDate = '2025-07-04';
  searchTerm = '';

  allOrders: any[] = [];
  filteredOrders: any[] = [];
  completedOrders: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.apiService.getMyTransactions().subscribe(data => {
      this.allOrders = data.map(this.mapOrderData);
      this.filterOrders();
    });
  }

  mapOrderData(order: any) {
    // This function should map the raw API response to the format the template expects
    return {
      id: order.id,
      type: order.fromUser === 'CURRENT_USER_ID' ? 'Bán' : 'Mua', // This logic needs to be adjusted
      amount: order.coinAmount,
      totalPrice: order.fiatAmount,
      price: order.price,
      partner: order.fromUser === 'CURRENT_USER_ID' ? order.toUser : order.fromUser, // Adjust as needed
      status: order.status, // e.g., PENDING, COMPLETED, CANCLE
      time: new Date(order.createdAt).toLocaleString('vi-VN'),
      remainingTime: '09:50' // Placeholder
    };
  }

  setTab(tab: 'pending' | 'completed') {
    this.tab = tab;
    this.filterOrders();
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
    let orders = [...this.allOrders];

    // Filter by main tab (pending vs completed)
    if (this.tab === 'pending') {
      // Assuming 'PENDING' is the status for pending orders
      orders = orders.filter(o => o.status === 'PENDING');
    } else {
      // Assuming 'COMPLETED' and 'CANCLE' are completed statuses
      orders = orders.filter(o => o.status === 'COMPLETED' || o.status === 'CANCLE');
    }

    // Apply other filters
    if (this.selectedStatus) {
      // This needs mapping from Vietnamese status to backend status
      // For now, we'll assume a direct match which might not work
      orders = orders.filter(o => o.status.toLowerCase() === this.selectedStatus.toLowerCase());
    }

    if (this.selectedOrder) { // "Mua" or "Bán"
      orders = orders.filter(o => o.type === this.selectedOrder);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      orders = orders.filter(o => o.partner.toLowerCase().includes(term) || o.id.toString().includes(term));
    }

    // Date filtering would go here if needed

    // Assign to the correct array for the view
    if (this.tab === 'pending') {
      this.filteredOrders = orders;
      this.completedOrders = [];
    } else {
      this.completedOrders = orders;
      this.filteredOrders = [];
    }
  }

  reportUser() {
    alert('Đã gửi báo cáo người dùng');
  }

  exportReport() {
    alert('Đã xuất báo cáo');
  }

  hasCompletedData(): boolean {
    return this.tab === 'completed' && this.completedOrders.length > 0;
  }

  noCompletedData(): boolean {
    return this.tab === 'completed' && this.completedOrders.length === 0;
  }

  hasPendingOrders(): boolean {
    return this.tab === 'pending' && this.filteredOrders.length > 0;
  }

  noPendingOrders(): boolean {
    return this.tab === 'pending' && this.filteredOrders.length === 0;
  }

}
