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
        
        this.assistantReply = JSON.stringify(response);
        this.chatMessages.push({ role: 'CloudExplorerbot', content: this.assistantReply });
        this.userMessage = '';
      });
  }
}
  export interface responseInt {
    id: string
    object: string
    created: number
    model: string
    prompt_filter_results: PromptFilterResult[]
    choices: Choice[]
    usage: Usage
  }
  
  export interface PromptFilterResult {
    prompt_index: number
    content_filter_results: ContentFilterResults
  }
  
  export interface ContentFilterResults {
    hate: Hate
    self_harm: SelfHarm
    sexual: Sexual
    violence: Violence
  }
  
  export interface Hate {
    filtered: boolean
    severity: string
  }
  
  export interface SelfHarm {
    filtered: boolean
    severity: string
  }
  
  export interface Sexual {
    filtered: boolean
    severity: string
  }
  
  export interface Violence {
    filtered: boolean
    severity: string
  }
  
  export interface Choice {
    finish_reason: string
    index: number
    message: Message
    content_filter_results: ContentFilterResults2
    logprobs: any
  }
  
  export interface Message {
    role: string
    content: string
  }
  
  export interface ContentFilterResults2 {
    hate: Hate2
    self_harm: SelfHarm2
    sexual: Sexual2
    violence: Violence2
  }
  
  export interface Hate2 {
    filtered: boolean
    severity: string
  }
  
  export interface SelfHarm2 {
    filtered: boolean
    severity: string
  }
  
  export interface Sexual2 {
    filtered: boolean
    severity: string
  }
  
  export interface Violence2 {
    filtered: boolean
    severity: string
  }
  
  export interface Usage {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  
