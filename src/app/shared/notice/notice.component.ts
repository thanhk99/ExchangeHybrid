import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.css',
  imports: [CommonModule],
})
export class NoticeComponent {
   message = '';
  type: 'success' | 'error' | 'info' = 'info';
  visible = false;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 3000); // tự ẩn sau 3s
  }

  close() {
    this.visible = false;
  }
}
