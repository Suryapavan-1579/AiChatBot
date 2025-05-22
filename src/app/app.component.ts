import { Component } from '@angular/core';
import { AiService } from './ai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  que: string = '';
  answer: string = '';
  data: any[] = [];
  isLoading = false;

  constructor(public ai: AiService) {}

  getData() {
    if (!this.que.trim()) return; // prevent empty questions

    this.isLoading = true;

    this.ai.Question(this.que).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        const responseText = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        
        this.data.push({
          q: this.que,
          a: responseText,
        });

        this.answer = responseText;
        this.que = '';
      },
      error: (err) => {
        this.isLoading = false;
        console.error('API error:', err);

        this.data.push({
          q: this.que,
          a: 'Something went wrong. Please try again.',
        });

        this.que = '';
      }
    });
  }
}
