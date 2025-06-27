import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // Form references
  @ViewChild('registerFormElement')
  registerFormElement!: ElementRef<HTMLFormElement>;
  @ViewChild('registerStep1') registerStep1!: ElementRef<HTMLDivElement>;
  @ViewChild('registerStep2') registerStep2!: ElementRef<HTMLDivElement>;
  @ViewChild('registerStep3') registerStep3!: ElementRef<HTMLDivElement>;

  currentRegisterEmail = '';
  private registerEmail!: HTMLInputElement;
  private registerOtp!: HTMLInputElement;
  private registerPassword!: HTMLInputElement;
  private confirmPassword!: HTMLInputElement;

  ngAfterViewInit() {
    // Lấy các phần tử từ DOM
    this.registerEmail = document.getElementById(
      'registerEmail'
    ) as HTMLInputElement;
    this.registerOtp = document.getElementById(
      'registerOtp'
    ) as HTMLInputElement;
    this.registerPassword = document.getElementById(
      'registerPassword'
    ) as HTMLInputElement;

    // Thiết lập sự kiện
    this.setupEventListeners();

    // Đảm bảo bước 1 được hiển thị khi khởi động
    this.setActiveFormStep(1);
  }

  private setupEventListeners() {
    // Xử lý gửi OTP (Bước 1 → Bước 2)
    const sendOtpBtn = document.getElementById('sendOtpRegister');
    if (sendOtpBtn) {
      sendOtpBtn.addEventListener('click', () => this.handleSendOtp());
    }

    // Xử lý xác thực OTP (Bước 2 → Bước 3)
    const verifyOtpBtn = document.getElementById('verifyOtpRegister');
    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener('click', () => this.handleVerifyOtp());
    }

    // Xử lý gửi lại OTP
    const resendOtpBtn = document.getElementById('resendRegisterOtp');
    if (resendOtpBtn) {
      resendOtpBtn.addEventListener('click', () => this.handleResendOtp());
    }

    // Xử lý submit form
    if (this.registerFormElement.nativeElement) {
      this.registerFormElement.nativeElement.addEventListener(
        'submit',
        (event) => {
          event.preventDefault();
          this.handleFormSubmit();
        }
      );
    }
  }

  private handleSendOtp() {
    const email = this.registerEmail.value.trim();

    if (!email) {
      alert('Vui lòng nhập email để gửi OTP');
      return;
    }

    if (!this.isValidEmail(email)) {
      alert('Email không hợp lệ');
      return;
    }

    this.currentRegisterEmail = email;
    this.setActiveFormStep(2);
    alert(`Mã OTP đã được gửi đến ${email}`);
  }

  private handleVerifyOtp() {
    const otp = this.registerOtp.value.trim();

    if (!otp) {
      alert('Vui lòng nhập mã OTP');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      alert('Mã OTP phải gồm 6 chữ số');
      return;
    }

    this.setActiveFormStep(3);
  }

  private handleResendOtp() {
    if (this.currentRegisterEmail) {
      alert(`Đã gửi lại OTP đến ${this.currentRegisterEmail}`);
    } else {
      alert(
        'Không tìm thấy email để gửi lại OTP. Vui lòng quay lại bước trước.'
      );
    }
  }

  private handleFormSubmit() {
    const password = this.registerPassword.value;

    // Kiểm tra mật khẩu
    if (!this.isPasswordValid(password)) {
      alert(
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và độ dài ≥8 ký tự'
      );
      return;
    }

    // Đăng ký thành công
    alert('Đăng ký thành công!');
    this.resetForm();
  }

  private setActiveFormStep(step: number) {
    // Ẩn tất cả các bước
    this.registerStep1.nativeElement.style.display = 'none';
    this.registerStep2.nativeElement.style.display = 'none';
    this.registerStep3.nativeElement.style.display = 'none';

    // Hiển thị bước được chọn
    if (step === 1) {
      this.registerStep1.nativeElement.classList.add('active');
      this.registerStep1.nativeElement.style.display = 'block';
      this.registerStep1.nativeElement.style.opacity = '1';
      this.registerFormElement.nativeElement.dataset['step'] = '1';
    } else if (step === 2) {
      this.registerStep2.nativeElement.classList.add('active');
      this.registerStep2.nativeElement.style.display = 'block';
      this.registerStep2.nativeElement.style.opacity = '1';
      this.registerFormElement.nativeElement.dataset['step'] = '2';
    } else if (step === 3) {
      this.registerStep3.nativeElement.classList.add('active');
      this.registerStep3.nativeElement.style.display = 'block';
      this.registerStep3.nativeElement.style.opacity = '1';
      this.registerFormElement.nativeElement.dataset['step'] = '3';
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isPasswordValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private resetForm() {
    this.registerFormElement.nativeElement.reset();
    this.currentRegisterEmail = '';
    this.setActiveFormStep(1);
  }
}
