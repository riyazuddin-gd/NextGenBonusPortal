import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Rank } from '../../models/fbo-data.model';

@Component({
  selector: 'app-rank-structure-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rank-structure-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RankStructureModalComponent {
  currentRankLevel = input.required<String>();
  allRanks = input.required<Rank[]>();
  close = output<void>();

  ranksToShow = computed(() => {
    const ranks = this.allRanks();
    const currentLevel = this.currentRankLevel();
    const currentIndex = ranks.findIndex(rank => rank.name === currentLevel);
    console.log("currentIndex",currentIndex);
    console.log("currentRankLevel",this.currentRankLevel.toString);
    if (currentIndex === -1) {
      return ranks.slice(0, 5); // Fallback
    }

    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(ranks.length, currentIndex + 4);

    return ranks.slice(startIndex, endIndex);
  });

  onClose(): void {
    this.close.emit();
  }
}