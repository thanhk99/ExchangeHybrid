import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  activeDropdown: string | null = null;
  timeout: any;

  menuItems = [
    { label: 'Mua tiền mặt', subItems: ['Mua bằng thẻ Visa, Mastercard và các thẻ khác', 'Giao dịch P2P', 'Mua/bán với hơn 100 phương thức thanh toán'] },
    { label: 'Khám phá', subItems: ['Thị trường', 'Cơ hội'] },
    { label: 'Giao dịch', subItems: ['Chuyển đổi', 'Spots','Features','Quyền chọn'] },
    { label: 'Tăng trưởng', subItems: ['Earn', 'Vay','Jumpstart'] },
    { label: 'Tổ chức', subItems: ['Trang chủ tổ chức', 'Thị trường liquid','API','Chương trình nhà môi giới'] },
    { label: 'Thêm', subItems: ['xBTC', 'Bảo mật quỹ tiền','Trạng thái'] }
  ];

  ngOnInit() {}

  onMouseEnter(label: string) {
    clearTimeout(this.timeout);
    this.activeDropdown = label;
  }

  onMouseLeave() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.activeDropdown = null;
    }, 200); 
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.activeDropdown) {
      const dropdown = document.querySelector(`.dropdown.active`);
      const dropdownContent = document.querySelector(`.dropdown-content`);
      if (dropdown && dropdownContent) {
        const rect = dropdown.getBoundingClientRect();
        const contentRect = dropdownContent.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Kiểm tra nếu chuột vẫn trong vùng dropdown hoặc dropdown-content
        if (
          mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom ||
          mouseX >= contentRect.left && mouseX <= contentRect.right && mouseY >= contentRect.top && mouseY <= contentRect.bottom
        ) {
          clearTimeout(this.timeout);
        }
      }
    }
  }

}
