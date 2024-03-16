import { Component } from '@angular/core';
import { OpenAiApiService } from '../service/open-ai-api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage!: string;
 
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];
 

  constructor(private openAiApiService: OpenAiApiService){}

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService.sendMessage(this.userMessage)
      .subscribe(response => {
        debugger;
        let data =response['choices'];
        let datamessage =data[0]['message'];
        this.assistantReply = JSON.stringify(datamessage['content']);
        this.chatMessages.push({ role: 'CloudExplorerbot', content: this.assistantReply });
        this.userMessage = '';
      });
  }
}
  