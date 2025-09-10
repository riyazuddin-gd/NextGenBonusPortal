import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FboService } from '../../services/fbo.service';
import { PredictiveEarningsCalculatorComponent } from '../predictive-earnings/predictive-earnings-calculator.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { EarningsHistoryModalComponent } from '../earnings-history-modal/earnings-history-modal.component';
import { DownlineTreeModalComponent } from '../downline-tree-modal/downline-tree-modal.component';
import { GoalDetailsModalComponent } from '../goal-details-modal/goal-details-modal.component';
import { RankStructureModalComponent } from '../rank-structure-modal/rank-structure-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    PredictiveEarningsCalculatorComponent, 
    RouterLink, 
    ChatbotComponent, 
    EarningsHistoryModalComponent,
    DownlineTreeModalComponent,
    GoalDetailsModalComponent,
    RankStructureModalComponent
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly fboService = inject(FboService);
  
  readonly fboData = this.fboService.currentFbo;
  readonly allRanks = this.fboService.allRanks;

  isEarningsModalOpen = signal(false);
  isDownlineModalOpen = signal(false);
  isGoalsModalOpen = signal(false);
  isRankModalOpen = signal(false);

  readonly totalMonthlyEarnings = computed(() => {
    return this.fboData()?.thisMonthCC ?? 0;
  });

  readonly averageGoalProgress = computed(() => {
    const totalCC = this.fboData()?.totalCC;
    return this.getLevelByCC(totalCC);
  });

  getLevelByCC(cc: number): string {
  switch (true) {
    case (cc < 2):
      return `${2 - cc}`;
    case (cc >= 2 && cc < 25):
      return `${25 - cc}`;
    case (cc >= 25 && cc < 75):
      return `${75 - cc}`;
    case (cc >= 75 && cc < 120):
      return `${120 - cc}`;
    case (cc >= 120 && cc < 150):
      return ` ${150 - cc}`;
    default:
      return "Invalid CC value";
  }
}

  openModal(modal: 'earnings' | 'downline' | 'goals' | 'rank'): void {
    if (modal === 'earnings') this.isEarningsModalOpen.set(true);
    if (modal === 'downline') this.isDownlineModalOpen.set(true);
    if (modal === 'goals') this.isGoalsModalOpen.set(true);
    if (modal === 'rank') this.isRankModalOpen.set(true);
  }

  closeModals(): void {
    this.isEarningsModalOpen.set(false);
    this.isDownlineModalOpen.set(false);
    this.isGoalsModalOpen.set(false);
    this.isRankModalOpen.set(false);
  }
}
