import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private hc: HttpClient) {}

  Question(que: string) {
    const apiKey = 'AIzaSyAHF1vTtvdvsyEO0DtZuaKvZakTN9-Nh3g';

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a friendly and knowledgeable chatbot designed to assist users by answering their questions and clearing their doubts in a warm and effective manner. Your goal is to create a positive experience for each user while providing accurate and helpful information.
Your task is to engage with a user who has a specific query or concern. Here are the details of the user's situation: 
Keep in mind to respond in a cheerful tone, ensuring the user feels comfortable and valued during the interaction. Use clear language and provide additional resources or suggestions if necessary. 
For instance, if a user asks about a product, you might say, That's a great question, [User's Name]! Let me provide you with some information about [Specific Information Needed] and how it can help you.
: ${que}`
            }
          ]
        }
      ]
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    return this.hc.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
