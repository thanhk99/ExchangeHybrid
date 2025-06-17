import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  imports: [CommonModule],
})
export class Footer {
  footerSections = [
  {
    subSections: [
      {
        title: 'Giới thiệu về OKX',
        open: false,
        items: [
          'Về OKX', 'Thông báo về Quyền riêng tư của Ứng viên', 'Cơ hội nghề nghiệp',
          'Liên hệ với chúng tôi', 'Điều khoản dịch vụ', 'Thông báo Bảo mật',
          'Công khai thông tin', 'Thông báo của người tố giác hành vi hối lộ',
          'Thực thi pháp luật', 'Ứng dụng OKX'
        ]
      }
    ]
  },
  {
    subSections: [
      {
        title: 'Sản phẩm',
        open: false,
        items: [
          'Mua tiền mã hóa', 'Giao dịch P2P', 'Chuyển đổi', 'Giao dịch',
          'Kiếm tiền', 'OKC', 'Bot giao dịch', 'Tất cả tiền mã hóa',
          'Học viện', 'TradingView', 'xBTC'
        ]
      }
    ]
  },
  {
    subSections: [
      {
        title: 'Dịch vụ',
        open: false,
        items: [
          'Đối tác', 'API', 'Dữ liệu lịch sử thị trường', 'Biểu phí CEX',
          'Ứng dụng niêm yết', 'Đơn đăng ký thương nhân P2P'
        ]
      },
      {
        title: 'Hỗ trợ',
        open: false,
        items: [
          'Trung tâm hỗ trợ', 'Xác minh chính thức', 'Thông báo', 'Kết nối với OKX'
        ]
      }
    ]
  },
  {
    subSections: [
      {
        title: 'Mua tiền mã hóa',
        open: false,
        items: [
          'Mua USDT', 'Mua USDC', 'Mua Bitcoin', 'Mua Ethereum', 'Mua ADA',
          'Mua Solana', 'Mua Litecoin', 'Mua XRP'
        ]
      },
      {
        title: 'Công cụ tính tiền mã hóa',
        open: false,
        items: [
          'BTC sang VND', 'ETH sang VND', 'USDT sang VND', 'SOL sang VND', 'XRP sang VND'
        ]
      }
    ]
  },
  {
    subSections: [
      {
        title: 'Giao dịch',
        open: false,
        items: [
          'BTC USDC', 'ETH USDC', 'BTC USDT', 'ETH USDT', 'LTC USDT', 'SOL USDT', 'XRP USDT',
          'Giá Bitcoin', 'Giá Ethereum', 'Giá Cardano', 'Giá Solana', 'Giá XRP',
          'Dự đoán giá Bitcoin', 'Dự đoán giá Ethereum', 'Dự đoán giá XRP',
          'Cách mua crypto', 'Cách mua Bitcoin'
        ]
      }
    ]
  }
];

   isDesktop: boolean = true;

ngOnInit(): void {
  this.checkWindowSize();
}

@HostListener('window:resize', [])
onResize() {
  this.checkWindowSize();
}

checkWindowSize() {
  this.isDesktop = window.innerWidth > 768;
  this.footerSections.forEach(section =>
    section.subSections.forEach(sub => sub.open = this.isDesktop)
  );
}

toggleGroup(group: any) {
  if (!this.isDesktop) {
    group.open = !group.open;
  }
}
}
