import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() totalValue: number = 0; // Giá trị ước tính
  @Input() isHidden: boolean = false; // Trạng thái ẩn/hiện giá trị
  @Output() toggleHidden = new EventEmitter<void>(); // Sự kiện khi click vào biểu tượng mắt
  @Output() navigateToRecharge = new EventEmitter<void>(); // Sự kiện điều hướng đến nạp tiền
  @Output() navigateToConvert = new EventEmitter<void>(); // Sự kiện điều hướng đến chuyển đổi
  @Output() navigateToWithdrawal = new EventEmitter<void>(); // Sự kiện điều hướng đến rút tiền
  @Output() navigateToTransfer = new EventEmitter<void>(); // Sự kiện điều hướng đến chuyển tiền

  // Phương thức để phát sự kiện toggleHidden
  onToggleHidden() {
    this.toggleHidden.emit();
  }

  // Phương thức để phát sự kiện nạp tiền
  onNavigateToRecharge() {
    this.navigateToRecharge.emit();
  }

  // Phương thức để phát sự kiện chuyển đổi
  onNavigateToConvert() {
    this.navigateToConvert.emit();
  }

  // Phương thức để phát sự kiện rút tiền
  onNavigateToWithdrawal() {
    this.navigateToWithdrawal.emit();
  }

  // Phương thức để phát sự kiện chuyển tiền
  onNavigateToTransfer() {
    this.navigateToTransfer.emit();
  }
}