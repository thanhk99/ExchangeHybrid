import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, NavTabs],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    profiletabs = [
    { label: 'Thông tin', path: '/profile' },
    { label: 'Cài đặt bảo mật', path: '/security' },
    { label: 'Xác minh', path: '/verify' },
    { label: 'Tùy chọn', path: '/options' },
    { label: 'Tài khoản phụ', path: '/subaccount' },
    { label: 'API', path: '/api' },
    { label: 'Ủy quyền chuyển tiếp ba', path: '/forward' }
  ];

  showModal = false;
  editedNickname = '';

  constructor(private router: Router,
              private toastr: ToastrService,
  ) { }

  user = {
    email: 'chipngaocho123@gmail.com',
    userId: '720653468201205989',
    phone: '0971823008',
    country: 'Việt Nam',
    verified: false,
    level: 'Người dùng thông thường',
    linkedAccount: 'Google',
   
  };

  copyToClipboard(value: string): void {
    navigator.clipboard.writeText(value);
    this.toastr.success('Đã sao chép!');
  }

  openEditNickname() {
  this.editedNickname = this.user.email;
  this.showModal = true;
}

cancelEdit() {
  this.showModal = false;
}

confirmEdit() {
  this.user.email = this.editedNickname;
  this.showModal = false;
  this.toastr.success('Đã cập nhật tên người dùng thành công!');
  this.editedNickname = '';
}

maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (user.length <= 2) return '*@' + domain;
  return user[0] + '***' + user[user.length - 1] + '@' + domain;
}

maskPhone(phone: string): string {
  return '*******' + phone.slice(-3);
}
goTo()
{
  this.router.navigate(['/security']);
}




}
