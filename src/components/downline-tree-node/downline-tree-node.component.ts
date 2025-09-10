import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownlineMember } from '../../models/fbo-data.model';

@Component({
  selector: 'app-downline-tree-node',
  standalone: true,
  // This component recursively imports itself to render the tree structure
  imports: [CommonModule],
  templateUrl: './downline-tree-node.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownlineTreeNodeComponent {
  member = input.required<DownlineMember>();
  isLast = input.required<boolean>();
  isExpanded = signal(true);

  toggleExpand(): void {
    this.isExpanded.update(v => !v);
  }
}