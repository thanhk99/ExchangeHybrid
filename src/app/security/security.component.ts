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
  user = {
    email: 'chipngaocho123@gmail.com',
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
}
