import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  imports: [CommonModule, FormsModule],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class Security {
  // Trạng thái modal
  showPhoneModal = false;
  showEmailModal = false;

  // Dữ liệu form
  newPhone = '';
  newEmail = '';
  verificationCode = '';
  remainingAttempts = 3;
  selectedCountryCode = '+84';
  newPhoneCode = '';
  emailCode = '';
  currentPhoneCode = '';
  newEmailCode = '';
  currentEmailCode = '';
  phoneCode = '';

  user = {
    email: 'chipngaocho123@gmail.com',
    phone: '0971823008',
  };

  securityItems = [
    {
      icon: '🔒',
      title: 'Khóa truy cập',
      desc: 'Trải nghiệm đăng nhập an toàn không cần mật khẩu và mã xác thực',
      recommended: true
    },
    {
      icon: '🔑',
      title: 'Mật khẩu đăng nhập',
      desc: 'Thiết lập mật khẩu để đăng nhập vào tài khoản của bạn',
      recommended: false
    },
    {
      icon: '📱',
      title: 'Ứng dụng xác thực',
      desc: 'Dùng mã xác thực để đăng nhập và sử dụng các chức năng khác',
      recommended: false
    },
    {
      icon: '🛡️',
      title: 'Mã chống lừa đảo',
      desc: 'Thêm mã duy nhất tới email OKX chính chủ',
      recommended: false
    }
  ];

  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (name.length < 3) return '***@' + domain;
    return name.substring(0, 3) + '***@' + domain;
  }

  maskPhone(phone: string): string {
    return '*******' + phone.slice(-3);
  }

  // Mở modal
  openPhoneModal() {
    this.showPhoneModal = true;
    this.newPhone = '';
    this.verificationCode = '';
  }

  openEmailModal() {
    this.showEmailModal = true;
    this.newEmail = '';
    this.verificationCode = '';
  }

  // Đóng modal
  closeModal() {
    this.showPhoneModal = false;
    this.showEmailModal = false;
  }

  // Gửi mã xác thực
  sendVerificationCode() {
    // Logic gửi mã ở đây
    console.log('Mã xác thực đã được gửi');
  }

  // Xác nhận thay đổi
  confirmChange() {
    if (this.showPhoneModal) {
      console.log('Đổi số điện thoại thành công:', this.newPhone);
    } else if (this.showEmailModal) {
      console.log('Đổi email thành công:', this.newEmail);
    }
    this.closeModal();
  }

  sendPhoneCode() {
    console.log('Gửi mã xác thực SMS đến số mới');
    // Logic gửi mã
  }

  sendEmailCode() {
    console.log('Gửi mã xác thực qua email');
    // Logic gửi mã
  }

  sendCurrentPhoneCode() {
    console.log('Gửi mã xác thực SMS đến số hiện tại');
    // Logic gửi mã
  }

  sendNewEmailCode() {
    console.log('Gửi mã xác thực đến email mới');
    // Logic gửi mã
  }

  sendCurrentEmailCode() {
    console.log('Gửi mã xác thực đến email hiện tại');
    // Logic gửi mã
  }

  sendPhoneVerificationCode() {
    console.log('Gửi mã xác thực SMS');
    // Logic gửi mã
  }

  confirmPhoneChange() {
    console.log('Xác nhận thay đổi số điện thoại');
    // Logic xác nhận
    this.closeModal();
  }

  confirmEmailChange() {
    console.log('Xác nhận thay đổi email');
    // Logic xác nhận
    this.closeModal();
  }
}
