import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavTabs } from '../../shared/nav-tabs/nav-tabs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-nextstep',
  standalone: true,
  templateUrl: './nextstep.html',
  imports: [CommonModule, NavTabs, FormsModule],
  styleUrl: './nextstep.css'
})
export class Nextstep {

  constructor(private router: Router) {}


  showModal = false;


  onSubmit() {
    this.showModal = true;
    // Gửi dữ liệu về backend ở đây nếu có
    console.log('Đã nhấn Đăng quảng cáo');
  }

  goBack() {
    this.router.navigate(['/create-ads']);
  }
  closeModal() {
    this.showModal = false;
  }

  confirmSubmit() {
    this.showModal = false;
    // Thực hiện gửi dữ liệu thật ở đây
    console.log('Gửi quảng cáo thành công');
  }
}
