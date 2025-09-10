import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FboData } from '../../models/fbo-data.model';
import { DownlineTreeNodeComponent } from '../downline-tree-node/downline-tree-node.component';

@Component({
  selector: 'app-downline-tree-modal',
  standalone: true,
  imports: [CommonModule, DownlineTreeNodeComponent],
  templateUrl: './downline-tree-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownlineTreeModalComponent {
  fboData = input.required<FboData>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}