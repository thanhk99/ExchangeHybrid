import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';



@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  imports: [CommonModule, FormsModule, NavTabs],
  styleUrls: ['./security.component.css']
})
export class Security {

  profiletabs = [
    { label: 'Thông tin', path: '/profile' },
    { label: 'Cài đặt bảo mật', path: '/security' },
    { label: 'Xác minh', path: '/verify' },
    { label: 'Tùy chọn', path: '/options' },
    { label: 'Tài khoản phụ', path: '/subaccount' },
    { label: 'API', path: '/api' },
    { label: 'Ủy quyền chuyển tiếp ba', path: '/forward' }
  ];
  // Trạng thái modal
  showPhoneModal = false;
  showEmailModal = false;
  showAntiPhishingModal = false;
  showPasswordModal = false;
  showAccessKeyModal = false;

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
  antiPhishingCode: string = '';
  confirmPassword: string = '';
  smsCode: string = '';
  newPassword: string = '';
  accessKey = '';
  isAccessKeyActive = false;
  accessKeyForm = {
    newKey: '',
    confirmKey: '',
    verificationCode: ''
  };
  showPasswordSection: boolean = false;
  password: string = '';
  shownewPassword: boolean = false; // Biến toggle cho mật khẩu mới
  showPassword: boolean = false; // Biến toggle cho mật khẩu
  showConfirmPassword: boolean = false; // Biến toggle cho xác nhận mật khẩu

  constructor(private router: Router,
              private toastr: ToastrService
  ) { }

  user = {
    email: 'chipngaocho123@gmail.com',
    phone: '0971823008',
  };

  securityItems = [
    {
      icon: '🔒',
      title: 'Mật khẩu cấp 2',
      desc: 'Trải nghiệm đăng nhập an toàn không cần mật khẩu và mã xác thực',
      recommended: true
    },
    {
      icon: '🔑',
      title: 'Thay đổi mật khẩu',
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleNewPasswordVisibility() {
    this.shownewPassword = !this.shownewPassword;
  }

  goToDevice() {
    this.router.navigate(['/device-management']);
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }




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

  // Phương thức kiểm tra định dạng mã chống lừa đảo
  isValidCodeFormat(code: string): boolean {
    return /^[A-Za-z0-9]*$/.test(code);
  }

  // Phương thức kiểm tra mã hợp lệ
  isValidCode(code: string): boolean {
    return !!code &&
      code.length >= 1 &&
      code.length <= 20 &&
      this.isValidCodeFormat(code);
  }

  // Phương thức kiểm tra mật khẩu hợp lệ
  isValidPassword(): boolean {
    return !!this.newPassword &&
      !!this.confirmPassword &&
      this.newPassword === this.confirmPassword &&
      !!this.smsCode;
  }

  onlyNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Ngăn ký tự không phải số
      return false;
    }
    return true;
  }


  // Phương thức lưu mã chống lừa đảo
  saveAntiPhishingCode(): void {
    if (this.isValidCode(this.antiPhishingCode)) {
      // Gọi API hoặc xử lý lưu mã
      console.log('Mã chống lừa đảo đã được lưu:', this.antiPhishingCode);
      this.showAntiPhishingModal = false;
      // Có thể thêm thông báo thành công ở đây
    }
  }

  // Phương thức gửi mã SMS
  sendSMSCode(): void {
    // Gọi API gửi mã xác thực qua SMS
    console.log('Mã SMS đã được gửi');
    // Có thể thêm thông báo đã gửi mã ở đây
  }

  // Phương thức cập nhật mật khẩu
  updatePassword(): void {
    if (this.isValidPassword()) {
      // Gọi API đổi mật khẩu
      console.log('Mật khẩu mới:', this.newPassword);
      console.log('Mã xác thực:', this.smsCode);
      this.showPasswordModal = false;
      // Có thể thêm thông báo thành công ở đây
    }
  }

  save() {
    if (this.password === this.confirmPassword && this.password.length === 6) {
      this.toastr.success('Mật khẩu đã được cập nhật thành công!');
      this.showPasswordSection = false; 
    } else {
      this.toastr.error('Mật khẩu không khớp hoặc không đúng định dạng (6 số)!');
    }
  }

  change() {
    this.password = '';
    this.confirmPassword = '';
    this.toastr.info('Nhập lại mật khẩu mới!');
  }

  // Phương thức mở modal thiết lập
  // Phương thức mở modal thiết lập
  setupItem(item: any): void {
    // Đóng tất cả modal trước khi mở modal mới
    this.showAntiPhishingModal = false;
    this.showPasswordModal = false;
    this.showPhoneModal = false;
    this.showEmailModal = false;
    this.showAccessKeyModal = false;
    this.showPasswordSection = false;

    // Kiểm tra và mở modal tương ứng
    switch (item.title) {
      case 'Mã chống lừa đảo':
        this.showAntiPhishingModal = true;
        break;

      case 'Thay đổi mật khẩu':
        this.showPasswordModal = true;
        break;

      case 'Mật khẩu cấp 2':
        this.showPasswordSection = true;
        break;

      case 'Xác thực qua điện thoại':
        this.openPhoneModal();
        break;

      case 'Xác thực qua email':
        this.openEmailModal();
        break;

      default:
        console.warn('Không tìm thấy chức năng tương ứng với:', item.title);
    }
  }
}
