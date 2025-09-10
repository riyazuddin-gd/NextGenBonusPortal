import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FboData} from '../../models/fbo-data.model';

@Component({
  selector: 'app-earnings-history-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './earnings-history-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EarningsHistoryModalComponent {
  fboData = input.required<FboData>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}