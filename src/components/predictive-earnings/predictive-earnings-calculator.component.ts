import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PredictionResult {
  level: string;
  bonus: number;
}

const DEFAULT_RESULT: PredictionResult = {
  level: "Assistant Supervisor",
  bonus: 0,
};

@Component({
  selector: 'app-predictive-earnings-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './predictive-earnings-calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictiveEarningsCalculatorComponent {

  constructor(private http: HttpClient) {}

   private apiUrl = 'http://localhost:8080/api/chat/predictive'

  // Input signals
  activeDownlines = signal(25);
  caseCredits = signal(3);

  // State signals
  isLoading = signal(false);
  error = signal<string | null>(null);
  prediction = signal<PredictionResult>(DEFAULT_RESULT);

  // Update signals from slider inputs
  updateDownlines(event: Event) {
    this.activeDownlines.set(Number((event.target as HTMLInputElement).value));
  }

  updateCaseCredits(event: Event) {
    this.caseCredits.set(Number((event.target as HTMLInputElement).value));
  }
result: PredictionResult | null = null;

// Button click handler
async handlePrediction(): Promise<void> {
  this.isLoading.set(true);
  this.error.set(null);

  try {
    const cc = this.caseCredits();
    const downlines = this.activeDownlines();

    this.getLevelAndBonus(cc).subscribe({
      next: (res) => {
        if (res) {
          this.result = res;
          // Always set a new object to update signal
          this.prediction.set({ ...res });
        }
      },
      error: (err) => {
        console.error('Error fetching prediction:', err);
        this.error.set(err.message || 'An error occurred while fetching prediction.');
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });

  } catch (e: any) {
    this.error.set(e.message || 'An unknown error occurred.');
    this.isLoading.set(false);
  }
}

// Level & bonus logic (returns Observable)
getLevelAndBonus(cc: number): Observable<PredictionResult> {
  console.log("cc", cc);
  return this.http.get<PredictionResult>(`${this.apiUrl}/${cc}`);
}


}

 