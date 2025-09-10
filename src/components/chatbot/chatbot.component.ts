import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FboService } from '../../services/fbo.service';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  private readonly fboService = inject(FboService);
  private readonly fboData = this.fboService.currentFbo;

  constructor(private http: HttpClient) {}

  // signals
  newUserMessage = signal('');
  chatMessages = signal<ChatMessage[]>([]);
  suggestions = signal<string[]>([
    "What’s my next level?",
    "who are my downline members?",
    "how many cc required to reach next level",
    "what is my current level and total cc"
  ]);

  // ViewChild refs
  @ViewChild('chatContainer') private chatContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('messageInput') private messageInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const fbo = this.fboData();
    this.chatMessages.set([
      {
        sender: 'bot',
        text: `Hello ${fbo.name}! How can I help you progress today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }

  ngAfterViewInit(): void {
    this.scrollToBottom(false); // greeting visible
  }

  sendMessage() {
    const messageText = this.newUserMessage().trim();
    if (!messageText) return;

    // hide suggestions after first user input
    if (this.suggestions().length > 0) {
      this.suggestions.set([]);
    }

    // push user message
    this.chatMessages.update(messages => [
      ...messages,
      {
        sender: 'user',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // clear input and refocus
    this.newUserMessage.set('');
    this.messageInput?.nativeElement?.focus();

    this.scrollToBottom(false);

    // call API with FBO id
    const fbo = this.fboData();
    this.fboService.sendMessage(fbo.id, messageText).subscribe({
      next: (res) => {
        this.chatMessages.update(messages => [
          ...messages,
          {
            sender: 'bot',
            text: res.reply || 'No response received.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        this.scrollToBottom(true);
      },
      error: () => {
        this.chatMessages.update(messages => [
          ...messages,
          {
            sender: 'bot',
            text: 'Oops! Something went wrong. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        this.scrollToBottom(true);
      }
    });
  }

  sendMessageFromSuggestion(suggestion: string) {
    this.newUserMessage.set(suggestion);
    this.sendMessage();
  }

  private scrollToBottom(smooth = true) {
    const el = this.chatContainer?.nativeElement;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        if (smooth) {
          el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        } else {
          el.scrollTop = el.scrollHeight;
        }
      } catch {
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
 