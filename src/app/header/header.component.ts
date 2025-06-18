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
  isMobile: boolean = false;
  showMobileMenu: boolean = false;

  constructor(private router: Router) {}

  searchActive: boolean = false;

  isLoggedIn: boolean = true;
  showUserMenu = false;

toggleSearch() {
  this.searchActive = !this.searchActive;
}

  menuItems = [
    { label: 'Mua tiền mặt', subItems: ['Mua bằng thẻ Visa, Mastercard và các thẻ khác', 'Giao dịch P2P', 'Mua/bán với hơn 100 phương thức thanh toán'] },
    { label: 'Khám phá', subItems: ['Thị trường', 'Cơ hội'] },
    { label: 'Giao dịch', subItems: ['Chuyển đổi', 'Spots', 'Features', 'Quyền chọn'] },
    { label: 'Tăng trưởng', subItems: ['Earn', 'Vay', 'Jumpstart'] },
    { label: 'Tổ chức', subItems: ['Trang chủ tổ chức', 'Thị trường liquid', 'API', 'Chương trình nhà môi giới'] },
    { label: 'Thêm', subItems: ['xBTC', 'Bảo mật quỹ tiền', 'Trạng thái'] }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 1200;
    if (!this.isMobile) {
      this.showMobileMenu = false;
      this.activeDropdown = null;
    }
  }
 

  onMouseEnter(label: string) {
    if (!this.isMobile) {
      clearTimeout(this.timeout);
      this.activeDropdown = label;
    }
  }

  onMouseLeave() {
    if (!this.isMobile) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.activeDropdown = null;
      }, 200); 
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.activeDropdown && !this.isMobile) {
      const dropdown = document.querySelector(`.dropdown.active`);
      const dropdownContent = document.querySelector(`.dropdown-content`);
      if (dropdown && dropdownContent) {
        const rect = dropdown.getBoundingClientRect();
        const contentRect = dropdownContent.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (
          mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom ||
          mouseX >= contentRect.left && mouseX <= contentRect.right && mouseY >= contentRect.top && mouseY <= contentRect.bottom
        ) {
          clearTimeout(this.timeout);
        }
      }
    }
  }

  toggleMenu() {
  console.log('Toggling menu, showMobileMenu:', !this.showMobileMenu);
  this.showMobileMenu = !this.showMobileMenu;
  if (!this.showMobileMenu) {
    this.activeDropdown = null;
  }
}

  toggleDropdown(label: string) {
  if (this.isMobile) {
    // Nếu đang mở thì đóng
    this.activeDropdown = this.activeDropdown === label ? null : label;
  } else {
    // Nếu không phải mobile thì xử lý hover
    this.activeDropdown = label;
  }
}


}
