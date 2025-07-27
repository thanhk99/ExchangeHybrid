import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [CommonModule],
})
export class LoginComponent {
  @ViewChild('loginFormElement') loginFormElement!: ElementRef<HTMLDivElement>;
  @ViewChild('loginStep1') loginStep1!: ElementRef<HTMLDivElement>;
  currentLoginEmail = '';
  private inputLoginEmail!: HTMLInputElement;
  private inputLoginPassWord!: HTMLInputElement;
  private loginOtp!: HTMLInputElement;
  constructor(
    private toasrt: ToastrService,
    private authService : Auth
  ) {}

  isLoading = false;

  ngAfterViewInit() {
    this.inputLoginEmail = document.getElementById(
      'loginEmail'
    ) as HTMLInputElement;
    this.inputLoginPassWord = document.getElementById(
      'loginPassword'
    ) as HTMLInputElement;
    this.loginOtp = document.getElementById('loginOtp') as HTMLInputElement;
    this.setupEventListener();
    this.setActiveFormStep(1);
  }
  private setupEventListener() {
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    if (sendOtpBtn) {
      sendOtpBtn.addEventListener('click', () => this.handleSendOtp());
    }
  }
  private setActiveFormStep(step: number) {
    this.loginStep1.nativeElement.style.display = 'none';
    if (step == 1) {
      this.loginStep1.nativeElement.classList.add('active');
      this.loginStep1.nativeElement.style.display = 'block';
      this.loginStep1.nativeElement.style.opacity = '1';
      this.loginFormElement.nativeElement.dataset[step] = '1';
    }
  }
  private handleSendOtp() {
    const email = this.inputLoginEmail.value.trim();
    const password = this.inputLoginPassWord.value.trim();
    if (!email) {
      this.toasrt.error('Vui lòng nhập email để đăng nhập', 'Chưa nhập email', {
        timeOut: 3000,
      });
      return;
    }
    if (!password) {
      this.toasrt.error(
        'Vui lòng nhập mật khẩu để đăng nhập',
        'Chưa nhập password',
        { timeOut: 3000 }
      );
      return;
    }
    this.currentLoginEmail = email;
    this.isLoading = true;
    this.authService.loginService(email, password).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toasrt.success(`Đăng nhập thành công`);
      },
      error: (err) => {
        this.isLoading = false;
        // console.error('Login failed:', err);
      }
    });

  }
  private verifyOtpLogin() {
    const otp = this.loginOtp.value.trim();
    if (!otp) {
      this.toasrt.error('Vui lòng nhập mã OTP', 'Chưa nhập mã OTP', {
        timeOut: 3000,
      });
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      this.toasrt.error('mã OTP phải có 6 chữ số', 'Lỗi', { timeOut: 3000 });
      return;
    }
  }
}
