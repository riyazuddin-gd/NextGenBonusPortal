import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FboData, Goal } from '../../models/fbo-data.model';

@Component({
  selector: 'app-goal-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goal-details-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoalDetailsModalComponent {

  
  fboData = input.required<FboData>();

  nextLevel:any;

  close = output<void>();

  ngOnInit(): void {
     console.log("ngOnint",this.fboData()) 
    this.calculateLevelProgress(this.fboData());  
   
  }

  levelCC = [{  name: 'Forever Preferred Customer', requirements: 0 },
  {name: 'Assistant Supervisor', requirements: 2  },
  {name: 'Supervisor', requirements: 25 },
  {name: 'Assistant Manager', requirements: 75 },
  {name: 'Manager', requirements: 120  }]

  

  onClose(): void {
    this.close.emit();
  }


  calculateLevelProgress(fbodata: any) {
  console.log("fbodata",fbodata);
  const currentCC = fbodata.totalCC;

  // Find current level index based on memberLevel
  const currentLevelIndex = this.levelCC.findIndex(
    l => l.name === fbodata.memberLevel
  );

  const currentLevel = this.levelCC[currentLevelIndex];
  this.nextLevel = this.levelCC[currentLevelIndex + 1];

  console.log("sjdhgsg",this.nextLevel);

  // Progress toward next level
  
  return   Math.min((currentCC / this.nextLevel.requirements) * 100, 100);

  
  }
}