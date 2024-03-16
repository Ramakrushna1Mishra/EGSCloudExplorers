
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {
  private apiKey = environment.OPENAI_API_KEY;
  private apiUrl = environment.apiUrl;
  private searchKey =environment.searchKey;
  constructor(private http: HttpClient) { }

 
  public sendMessage(message: string) {
    let body = `{
      "dataSources": [
        {
          "type": "AzureCognitiveSearch",
          "parameters": {
            "endpoint": "https://cloudexplorerssearch.search.windows.net",
            "indexName": "cloudexplorers-finaldata",
            "semanticConfiguration": "cloudexplorers-config",
            "queryType": "vectorSimpleHybrid",
            "fieldsMapping": {
              "contentFieldsSeparator": "-",
             
              "filepathField": null,
              "titleField": "content",
              "urlField": "metadata_storage_path"
              
            },
            "inScope": true,
            "roleInformation": "You are an AI assistant that helps people find information.",
            "filter": null,
            "strictness": 3,
            "topNDocuments": 5,
            "key": "`+this.searchKey+`",
            "embeddingDeploymentName": "cloudexplorerstextembed"
          }
        }
      ],
      "messages": [
       
        {
          "role": "user",
          "content": "`+message+`"
        }
      ],
      "deployment": "cloudexplorers-bot",
      "temperature": 0,
      "top_p": 1,
      "max_tokens": 800,
      "stop": null,
      "stream": false
    }`;
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'api-key': `${this.apiKey}` });
  let options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}`,body,options);
  }
}
