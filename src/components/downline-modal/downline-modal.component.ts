import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FboData } from '../../models/fbo-data.model';

@Component({
  selector: 'app-downline-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downline-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownlineModalComponent {
  fboData = input.required<FboData>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
