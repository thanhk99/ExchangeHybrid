import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  showModal = false;
  editedNickname = '';

  constructor(private router: Router,
              private toastr: ToastrService
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
