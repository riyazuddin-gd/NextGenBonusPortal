import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FboService } from '../../services/fbo.service';
 
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private readonly router = inject(Router);
  private readonly fboService = inject(FboService);
 
  fboId = signal('');
  isLoading = signal(false);
 
  handleContinue(): void {
    if (!this.fboId() ) {
      alert("Please enter a valid 12-digit FBO ID");
      return;
    }
    const id = this.fboId().trim();
    this.isLoading.set(true);
 

      this.fboService.login(id);
      this.router.navigate(['/dashboard']);
      this.isLoading.set(false);
 
  }
 
  updateFboId(event: Event) {
    let input = (event.target as HTMLInputElement).value;
    input = input.replace(/[^0-9]/g, '');
    this.fboId.set(input);
    // const input = event.target as HTMLInputElement;
    // this.fboId.set(input.value);
  }
  blockNonNumeric(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
}