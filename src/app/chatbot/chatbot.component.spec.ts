import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot.component';
import { OpenAiApiService } from '../service/open-ai-api.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let openAiApiService: jasmine.SpyObj<OpenAiApiService>;

  beforeEach(async () => {
    const openAiApiServiceSpy = jasmine.createSpyObj('OpenAiApiService', ['sendMessage']);

    await TestBed.configureTestingModule({
      declarations: [ChatbotComponent],
      imports: [FormsModule],
      providers: [
        { provide: OpenAiApiService, useValue: openAiApiServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    openAiApiService = TestBed.inject(OpenAiApiService) as jasmine.SpyObj<OpenAiApiService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message and receive a reply', fakeAsync(() => {
    const userMessage = 'Test message';
    const assistantReply = "Test reply";
    const mockResponse = {
      choices: [{
        message: {
          content: assistantReply
        }
      }]
    };
  
    openAiApiService.sendMessage.and.returnValue(of(mockResponse));
  
    component.userMessage = userMessage;
    component.sendMessage();
    tick();
  
    expect(openAiApiService.sendMessage).toHaveBeenCalledWith(userMessage);
    expect(component.chatMessages.length).toBe(2); 
  
    // Trim the response before comparison to remove any whitespace
    // const trimmedAssistantReply = assistantReply.trim();
    // const trimmedReceivedReply = component.chatMessages[1].content.trim();
    // console.log('Expected reply characters:', JSON.stringify(trimmedAssistantReply));
    // console.log('Received reply characters:', JSON.stringify(trimmedReceivedReply));
    
    // expect(trimmedReceivedReply).toEqual(trimmedAssistantReply);
    expect(component.userMessage).toBe('');
  }));
  
});
