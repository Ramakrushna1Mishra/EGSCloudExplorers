import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {
  private apiKey = environment.OPENAI_API_KEY;
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

 
  public sendMessage(message: string) {
    let body = `{
      "messages": [{"role":"system","content":"`+message+`"}],
      "max_tokens": 800,
      "temperature": 0.7,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "top_p": 0.95,
      "stop": null
    }`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': `${this.apiKey}` });
  let options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}`, body,options);
  }
}