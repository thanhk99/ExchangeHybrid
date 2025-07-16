import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoininfoService } from '../services/coininfo.service';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

@Component({
  selector: 'app-earn',
  templateUrl: './earn.component.html',
  styleUrls: ['./earn.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NavTabs],
  standalone: true
})
export class EarnComponent implements OnInit {
  earnTabs = [
    { label: 'Tổng quan', path: '/earn' },
    { label: 'Simple Earn', path: '/earn/simple-earn' },
    { label: 'Đầu tư kép', path: '/earn/savings' },
    { label: 'On-chain Earn', path: '/earn/on-chain-earn' },
  ];

  products: any[] = [];

  faqs = [
    {
      question: 'Earn là gì?',
      answer: 'OKX Earn giúp bạn kiếm tiền lãi từ tài sản thông qua nhiều lựa chọn đầu tư. Các sản phẩm gồm Simple Earn, Vay và On-chain Earn.',
      isOpen: false
    },
    {
      question: 'Lãi suất hàng năm (APR) là gì?',
      answer: 'APR là tỷ lệ phần trăm lợi nhuận hàng năm bạn có thể nhận được từ đầu tư.',
      isOpen: false
    },
    {
      question: 'Thời gian tính/phân phối lợi nhuận thu được là bao lâu?',
      answer: 'Thời gian phụ thuộc vào sản phẩm bạn chọn, thường là hàng ngày hoặc hàng tuần.',
      isOpen: false
    },
    {
      question: 'Rủi ro là gì?',
      answer: 'Rủi ro bao gồm biến động thị trường và khả năng mất vốn nếu thị trường không thuận lợi.',
      isOpen: false
    }
  ];

  constructor(private coininfoService: CoininfoService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.coininfoService.getCoinInfo().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}