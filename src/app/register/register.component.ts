import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../services/auth.service';

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
  @ViewChild('registerStep4') registerStep4!: ElementRef<HTMLDivElement>;

  currentRegisterEmail = '';
  private registerEmail!: HTMLInputElement;
  private registerOtp!: HTMLInputElement;
  private registerPassword!: HTMLInputElement;
  private confirmPassword!: HTMLInputElement;
  private registerUsername!:HTMLInputElement;
  private registerNation!:HTMLInputElement;
  isSubmitting = false;
  constructor(private toastr: ToastrService,private authService:Auth) {

  }

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
    this.registerUsername = document.getElementById(
      'registerUsername'
    ) as HTMLInputElement;
     this.registerNation = document.getElementById(
      'registerNation'
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
      this.toastr.error('Vui lòng nhập email để gửi OTP', 'Lỗi', {
        timeOut: 3000,
      });
      return;
    }

    if (!this.isValidEmail(email)) {
      this.toastr.error('Email không hợp lệ', 'Lỗi', { timeOut: 3000 });
      return;
    }

    this.currentRegisterEmail = email;
    this.setActiveFormStep(2);
    this.toastr.success(`Mã OTP đã được gửi đến ${email}`, 'Thành Công', {
      timeOut: 3000,
    });
  }

  private handleVerifyOtp() {
    const otp = this.registerOtp.value.trim();

    if (!otp) {
      this.toastr.error('Vui lòng nhập mã OTP', 'Lỗi', { timeOut: 3000 });
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      this.toastr.error('Mã OTP phải gồm 6 chữ số', 'Lỗi', { timeOut: 3000 });
      return;
    }

    this.setActiveFormStep(3);
  }

  private handleResendOtp() {
    if (this.currentRegisterEmail) {
      this.toastr.info(
        `Đã gửi lại OTP đến ${this.currentRegisterEmail}`,
        'Lỗi',
        { timeOut: 3000 }
      );
    } else {
      this.toastr.error(
        'Không tìm thấy email để gửi lại OTP. Vui lòng quay lại bước trước.',
        'Lỗi',
        { timeOut: 3000 }
      );
    }
  }

   private handleFormSubmit() {
    if (this.isSubmitting) return;

    const username = this.registerUsername.value.trim();
    const password = this.registerPassword.value.trim();
    const email = this.currentRegisterEmail;
    const nation = this.registerNation.value;

    if (!this.isPasswordValid(password)) {
      console.error('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long');
      return;
    }

    this.isSubmitting = true;
    this.setActiveFormStep(4);
    let timeoutId: any;
    const timeoutPromise = new Promise<void>((resolve) => {
    timeoutId = setTimeout(() => {
      resolve();
    }, 1000); 
  });

    this.authService.registerService(email, password, username, nation).subscribe({
      next: (res) => {
        clearTimeout(timeoutId);
        if (res.success) {
          this.resetForm();
        }
      },
      error: (err) => {
        clearTimeout(timeoutId);
        this.setActiveFormStep(3);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
  private setActiveFormStep(step: number) {
    // Ẩn tất cả các bước
    this.registerStep1.nativeElement.style.display = 'none';
    this.registerStep2.nativeElement.style.display = 'none';
    this.registerStep3.nativeElement.style.display = 'none';
    this.registerStep4.nativeElement.style.display = 'none';

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
    } else if (step === 4) {
    this.registerStep4.nativeElement.classList.add('active');
    this.registerStep4.nativeElement.style.display = 'block';
    this.registerStep4.nativeElement.style.opacity = '1';
    this.registerFormElement.nativeElement.dataset['step'] = '4';
  }
}

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    this.isSubmitting = false;
    this.setActiveFormStep(1);
  }
}
