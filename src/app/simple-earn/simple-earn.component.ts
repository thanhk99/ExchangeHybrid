import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoininfoService } from '../services/coininfo.service';
import { NavTabs } from '../shared/nav-tabs/nav-tabs';

interface Tab {
  label: string;
  path: string;
  isActive?: boolean;
  content?: string | null; 
  subTabs?: Tab[] | null;
}

@Component({
  selector: 'app-simple-earn',
  templateUrl: './simple-earn.component.html',
  styleUrls: ['./simple-earn.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, NavTabs],
  standalone: true
})
export class SimpleEarnComponent implements OnInit {
  earnTabs: Tab[] = [
    { label: 'Tổng quan', path: '/earn' },
    { label: 'Simple Earn', path: '/simple-earn' },
    { label: 'Đầu tư kép', path: '' },
    { label: 'On-chain Earn', path: '' },
  ];
  simpleEarnTabs: Tab[] = [
    { 
      label: 'Giới thiệu', 
      path: '', 
      content: `
        <h2>Simple Earn là gì?</h2>
        
        <p><strong>Simple Earn</strong> là một sản phẩm do OKX tạo ra để giúp người dùng dễ dàng bắt đầu kiếm tiền bằng số tiền nhàn rỗi với rào cản gia nhập thấp. Simple Earn có hai loại: Cố định và Linh hoạt.</p>
        
      `,
      isActive: true
    },
    { 
      label: 'Linh hoạt', 
      path: '', 
      isActive: false, 
      subTabs: [
        { 
          label: 'Tổng quan', 
          path: '', 
          content: `
            <h3>Simple Earn linh hoạt là gì?</h3>
            <p>Simple Earn Linh hoạt là một trong các sản phẩm giá trị gia tăng của chúng tôi để kiếm lợi nhuận linh hoạt. Kiếm tiền lãi theo giờ bằng cách gửi tài sản để cấp vốn cho các khoản vay ký quỹ trên OKX. Chúng tôi hỗ trợ đăng ký và tất toán tài sản 24/7.</p>
            <p>Lưu ý: Lợi nhuận trong quá khứ không phải chỉ báo cho lợi nhuận ở tương lai. Chúng tôi không đảm bảo khoản hoàn trả tiền gốc hoặc tiền lãi dưới dạng đồng tiền, vật phẩm thật, vốn chủ sở hữu hay các loại tài sản khác trong một khoảng thời gian nhất định.</p>
            <h3>Bao gồm những lợi ích gì?</h3>
            <h4>Rủi ro thấp</h4>
            <p>Chúng tôi bảo vệ tài sản của bạn trong Simple Earn bằng biện pháp kiểm soát rủi ro nghiêm ngặt, biện pháp an ninh và hạ tầng cao cấp đầu ngành.</p>
            <h4>Kỳ hạn linh hoạt</h4>
            <p>Bạn có thể đăng ký và tất toán trên Simple Earn Linh hoạt bất cứ lúc nào. Sau khi yêu cầu tất toán, số tiền tất toán sẽ được trả lại vào tài khoản Funding của bạn ngay lập tức.</p>
            `
        },
        { 
          label: 'Nguồn tiền lãi', 
          path: '', 
          content: `
            <h2>Tiền lãi được tạo ra như thế nào?</h2>
            <p>Thu nhập Simple Earn Linh Hoạt đến từ việc cho Vay linh hoạt và cho người dùng giao dịch ký quỹ vay trên thị trường cho vay.</p>
          ` 
        },
        { 
          label: 'Câu hỏi thường gặp', 
          path: '', 
          content: `
            <h3>1.Simple Earn Linh hoạt hoạt động thế nào?</h3>
            <p>Simple Earn Linh hoạt cho phép người dùng kiếm tiền lãi hàng giờ bằng cách cấp vốn vay ký quỹ trên OKX.</p>
            <h3>2.Khi nào tôi sẽ bắt đầu kiếm được tiền?</h3>
            <p>Đối với khoản tiền cho vay trong một giờ bất kỳ, tiền lãi của bạn cho giờ đó sẽ được trả vào giờ tiếp theo.</p>
            <h3>3.Lãi suất được tính như thế nào?</h3>
            <p>Với 15% tiền lãi cho vay được giữ lại làm quỹ bảo hiểm, tiền lãi cho vay theo giờ chính là tiền vay gốc × APR / 365 / 24 × 85%.</p>
            <h3>4.Tại sao tôi vẫn chưa nhận được tiền lãi?</h3>
            <p>Tiền lãi chỉ áp dụng cho tài sản cho vay. Vui lòng xác minh xem tài sản của bạn đã được cho vay chưa. Xin lưu ý rằng bạn sẽ không nhận được tiền lãi hoặc phần thưởng trong những giờ tới nếu số lượng còn lại thấp hơn số lượng đã vay hoặc giới hạn phần thưởng.</p>
            <h3>5.Có thời hạn nhất định để được hưởng mức APR thưởng không?</h3>
            <p>Có, số tiền đủ điều kiện của bạn sẽ chỉ hưởng mức APR thưởng trong 180 ngày.</p>
            <h3>6.Khi nào tôi có thể nhận được tài sản đã tất toán?</h3>
            <p>Bạn sẽ nhận được tiền ngay bất kể trạng thái khoản vay.</p>

            
            
          ` 
        },
      ]
    },
    { 
      label: 'Cố định', 
      path: '', 
      isActive: false, 
      subTabs: [
        { 
          label: 'Tổng quan', 
          path: '', 
          content: `
            <h2>Simple Earn Cố Định là gì?</h2>
            <p>Với Simple Earn Cố định, bạn có thể nhận tiền lãi trong thời hạn cố định theo lãi suất cố định. Bạn sẽ nhận lãi suất hàng ngày dựa trên lãi suất hàng năm (APR). Tiền lãi sẽ được cộng dồn hàng ngày và toàn bộ tiền lãi sẽ được thanh toán cho bạn khi thời hạn kết thúc.</p>
            <p>Lưu ý: Lợi nhuận trong quá khứ không phải chỉ báo cho lợi nhuận ở tương lai. Chúng tôi không đảm bảo khoản hoàn trả vốn gốc hoặc tiền lãi dưới dạng đồng tiền, vật phẩm thật, vốn chủ sở hữu hay các loại tài sản khác trong một khoảng thời gian nhất định.</p>
            <h4>Kỳ hạn cố định, lãi suất cố định</h4>
            <p>Cho vay số tiền nhàn rỗi với lãi suất cố định trong thời hạn cố định.</p>
            <h4>Thu nhập ổn định</h4>
            <p>Dễ dàng nhận tiền lãi nhờ khớp nhu cầu vay và cho vay ngang hàng.</p>
            <h4>Kiểm soát rủi ro đáng tin cậy</h4>
            <p>Các biện pháp kiểm soát rủi ro nghiêm ngặt và bảo mật hàng đầu trong ngành, cũng như cơ sở hạ tầng tiên tiến.</p>
            <h2>Cách thức hoạt động ra sao?</h2>
            <p>Khi bạn cho vay bằng Simple Earn Cố định, tiền của bạn sẽ được dùng để đáp ứng nhu cầu vay từ Khoản vay Tổ chức.</p>
            <p>Tổng nhu cầu vay được chia thành các lệnh vay, đồng thời lệnh cho vay của bạn sẽ được khớp với các lệnh vay này theo APR cố định.</p>
            <p>Thời hạn bắt đầu khi lệnh vay khớp lệnh được cấp vốn, tại thời điểm đó, bạn bắt đầu tích lũy tiền lãi hàng ngày.</p>
            <p>Trong khi chờ khớp lệnh, nếu phần lệnh vay chưa khớp lệnh bị hủy hoặc nếu APR thị trường thay đổi mạnh, phần lệnh vay đã khớp lệnh sẽ được coi là đã được cấp vốn và thời hạn sẽ bắt đầu.</p>
            <p>Lệnh của bạn có thể được chia thành nhiều lệnh phụ nếu nó khớp với nhiều lệnh vay. Thời hạn và thời gian dồn tích lãi của mỗi lệnh phụ sẽ chỉ bắt đầu khi lệnh vay khớp của nó được cấp vốn.</p>
            <h2>Rủi ro là gì?</h2>
            <p>Xin lưu ý rằng khi kỳ hạn bắt đầu, lệnh của bạn sẽ bị khóa cho đến khi kỳ hạn kết thúc. Lệnh của bạn có thể bị chấm dứt trước khi kỳ hạn kết thúc. Trong trường hợp này, bạn sẽ nhận được 100% số tiền lãi còn lại được tích lũy dưới dạng đền bù, nhưng sẽ không có khoản đền bù nào được thanh toán nếu việc chấm dứt diễn ra trong vòng 24 giờ trước khi kỳ hạn theo lịch trình kết thúc.</p>
            <p>Lệnh của bạn cũng có thể được gia hạn do chậm hoàn trả trong tối đa 14 ngày. Trong trường hợp này, bạn sẽ tích lũy lãi suất bù trừ (số tiền có thể được tìm thấy trên màn hình lịch sử lãi suất bù trừ) theo giờ. Tổng lãi suất sẽ được phân phối vào tài khoản Funding của bạn khi người vay hoàn trả số tiền bạn đã cho họ vay.</p>
            <p>Vốn gốc của bạn chịu rủi ro khi đầu tư vào crypto, bao gồm biến động thị trường, rủi ro tỷ giá hối đoái, thanh lý của người vay và số tiền không thể tất toán trong thời hạn.</p>
            <p>Trong trường hợp người vay không hoàn trả và tài sản thế chấp của họ không đủ để hoàn trả lệnh cho vay, bạn có nguy cơ mất vốn gốc. Việc này được giảm thiểu nhờ các biện pháp kiểm soát rủi ro nghiêm ngặt và bảo mật hàng đầu trong ngành, cũng như cơ sở hạ tầng tiên tiến của OKX.</p>
            ` 
        },
        { 
          label: 'Nguồn tiền lãi', 
          path: '', 
          content: `
            <h2>Tiền lãi được tạo ra như thế nào?</h2>
            <p>Tiền lãi được tạo ra bằng cách cho người dùng Khoản vay Tổ chức trên OKX vay tài sản của bạn. Thời hạn của lệnh vay bắt đầu khi lệnh vay tương ứng được cấp vốn, tại thời điểm đó, bạn bắt đầu tích lũy tiền lãi hàng ngày. Bạn sẽ nhận tổng lãi suất khi người vay hoàn trả vốn gốc và tiền lãi.</p>
            <p>Trong khi chờ khớp lệnh, nếu phần lệnh vay chưa khớp lệnh bị hủy hoặc nếu APR thị trường thay đổi mạnh, phần lệnh vay đã khớp lệnh sẽ được coi là đã được cấp vốn và thời hạn sẽ bắt đầu.</p>
            <h2>Tiền lãi được tính như thế nào?</h2>
            <p>Tổng lãi suất của bạn = Vốn gốc × APR cho vay × số ngày của thời hạn / 365</p>
            <p>Ví dụ: nếu vốn gốc là 100.000 USDT, APR cho vay là 10%, còn thời hạn là 90 ngày.</p>
            <p>Tổng lãi suất sẽ là:
            100.000 USDT × 10% × 90 / 365 = 2.465,75 USDT</p>
            <p>Số tiền lãi mỗi ngày sẽ là:
            100.000 USDT × 10% × 90 / 365 / 90 = 27,40 USDT</p>

          ` 
        },
        { 
          label: 'Câu hỏi thường gặp', 
          path: '', 
          content: `
            <h3>1.Tôi có thể cho vay loại tiền mã hóa nào theo chương trình Simple Earn cố định?</h3>
            <p>Bạn chỉ có thể cho vay USDT thông qua sản phẩm Simple Earn Cố định.</p>
            <h3>2.APR cho vay là gì?</h3>
            <p>APR cho vay là lãi suất hàng năm mà lệnh cho vay của bạn sẽ được hưởng lãi khi lệnh vay phù hợp được cấp vốn. Lãi suất này do OKX xác định cho người dùng Khoản vay Tổ chức và tính đến nhiều yếu tố thị trường khác nhau.</p>
            <h3>3.Khi nào thì tôi bắt đầu nhận được tiền lãi?</h3>
            <p>Thời hạn của lệnh cho vay bắt đầu khi lệnh vay khớp lệnh được cấp vốn, tức là khi bạn bắt đầu kiếm được tiền lãi. Trong khi lệnh của bạn đang chờ xử lý, bạn sẽ không kiếm được bất kỳ khoản tiền lãi nào.</p>
            <p>Trong khi chờ khớp lệnh, nếu phần lệnh vay không khớp lệnh bị hủy hoặc nếu APR thị trường thay đổi mạnh, phần lệnh vay đã khớp lệnh sẽ được coi là đã được cấp vốn và thời hạn sẽ bắt đầu.</p>
            <h3>4.Lệnh cho vay của tôi có bị tách ra hoặc khớp với nhiều lệnh vay không?</h3>
            <p>Có, lệnh cho vay của bạn có thể được tách thành nhiều lệnh phụ nếu nó khớp với nhiều lệnh vay.</p>
            <p>Thời hạn và thời gian dồn tích lãi của mỗi lệnh phụ sẽ bắt đầu khi lệnh vay khớp của nó được cấp vốn.</p>
            <h3>5.Khi nào thì tiền gốc của tôi được hoàn lại?</h3>
            <p>Vốn gốc sẽ được hoàn lại vào tài khoản Funding của bạn khi thời hạn kết thúc.</p>
            <h3>6.Tại sao lệnh của tôi được gia hạn?</h3>
            <p>Nếu có sự chậm hoàn trả vốn gốc, lệnh của bạn sẽ được gia hạn cho đến khi người vay hoàn trả. Thời gian gia hạn tối đa là 14 ngày.</p>
            <p>Trong thời gian gia hạn, APR cho vay sẽ được thay thế bằng lãi suất bù trừ (số tiền có thể tìm thấy trên màn hình lịch sử lãi suất bù trừ), mà bạn sẽ tích lũy theo giờ. Tổng lãi suất sẽ được phân phối vào tài khoản Funding của bạn khi người vay hoàn trả số tiền bạn đã cho họ vay.</p>
            <h3>7.Tôi có thể tất toán sớm không?</h3>
            <p>Không, chỉ có thể tất toán sớm khi trạng thái lệnh cho vay của bạn vẫn là "Đang chờ xử lý".</p>
            <p>Sau khi thời hạn lệnh cho vay của bạn bắt đầu và trạng thái đã thay đổi thành "Đang kiếm tiền", bạn sẽ không thể tất toán cho đến khi thời hạn kết thúc.</p>
            <h3>8.Chuyện gì sẽ xảy ra khi lệnh của tôi bị chấm dứt sớm?</h3>
            <p>Nếu lệnh bị chấm dứt trước khi thời hạn dự kiến kết thúc do việc hoàn trả sớm, bạn sẽ nhận được 100% số tiền lãi còn lại dưới dạng đền bù. Tuy nhiên, nếu lệnh của bạn bị chấm dứt sát với thời hạn dự kiến kết thúc, bạn sẽ không được đền bù.</p>
            <h3>9.Khi nào thì lệnh của tôi được thanh toán nếu có nhiều lệnh phụ?</h3>
            <p>Mặc dù mỗi lệnh phụ sẽ có thời gian thanh toán riêng, lệnh của bạn sẽ chỉ được thanh toán đầy đủ khi thời hạn của lệnh phụ cuối cùng kết thúc.</p>
            <h3>10.Có rủi ro gì với tiền gốc của tôi không?</h3>
            <p>Có. Vốn gốc của bạn phải chịu rủi ro, bao gồm việc người vay không hoàn trả và tài sản thế chấp của họ không đủ để hoàn trả lệnh cho vay. Vốn gốc cũng chịu rủi ro khi đầu tư vào crypto, bao gồm biến động thị trường, rủi ro tỷ giá hối đoái và thanh lý của người vay.</p>
            <p>Mặc dù điều này được giảm thiểu nhờ các biện pháp kiểm soát rủi ro nghiêm ngặt và bảo mật hàng đầu trong ngành, cũng như cơ sở hạ tầng tiên tiến, bạn vẫn có nguy cơ mất toàn bộ hoặc một phần vốn gốc của mình.</p>
            
          ` 
        },
      ]
    },
  ];
  products: any[] = [];
  isPopupVisible: boolean = false;
  activeSubTab: string | null = null;
  selectedTabContent: string | null = this.simpleEarnTabs[0].content || null; 

  constructor(private coininfoService: CoininfoService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.coininfoService.getCoinInfo().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
    if (!this.isPopupVisible) {
      this.activeSubTab = null;
      this.selectedTabContent = this.simpleEarnTabs[0].content || null;
      this.simpleEarnTabs.forEach(tab => {
        tab.isActive = tab.label === 'Giới thiệu ';
        if (tab.label !== 'Giới thiệu ') {
          tab.subTabs = tab.subTabs || null;
        }
      });
    } else {
      this.simpleEarnTabs[0].isActive = true;
      this.selectedTabContent = this.simpleEarnTabs[0].content || null;
    }
  }

  closePopup(event?: Event) {
    if (event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains('simple-earn-popup') || target.classList.contains('close-popup')) {
        this.isPopupVisible = false;
        this.activeSubTab = null;
        this.selectedTabContent = this.simpleEarnTabs[0].content || null;
        this.simpleEarnTabs.forEach(tab => {
          tab.isActive = tab.label === 'Giới thiệu ';
          if (tab.label !== 'Giới thiệu') {
            tab.subTabs = tab.subTabs || null;
          }
        });
      }
    } else {
      this.isPopupVisible = false;
      this.activeSubTab = null;
      this.selectedTabContent = this.simpleEarnTabs[0].content || null;
      this.simpleEarnTabs.forEach(tab => {
        tab.isActive = tab.label === 'Giới thiệu ';
        if (tab.label !== 'Giới thiệu') {
          tab.subTabs = tab.subTabs || null;
        }
      });
    }
  }

  toggleSubTabs(tabLabel: string) {
    this.simpleEarnTabs.forEach(tab => {
      tab.isActive = tab.label === tabLabel;
      if (tab.label === tabLabel) {
        this.selectedTabContent = tab.label === 'Giới thiệu' ? tab.content || null : null;
        this.activeSubTab = tab.label !== 'Giới thiệu' ? tab.subTabs?.[0].label || null : null;
        if (this.activeSubTab) {
          this.selectedTabContent = tab.subTabs?.[0].content || null;
        }
      }
    });
  }

  selectSubTab(subTab: Tab, parentTab: Tab) {
    this.activeSubTab = subTab.label;
    this.selectedTabContent = subTab.content || null;
    this.simpleEarnTabs.forEach(tab => {
      tab.isActive = tab.label === parentTab.label;
    });
  }
}