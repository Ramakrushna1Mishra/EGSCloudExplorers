import { TestBed } from '@angular/core/testing';

import { OpenAiApiService } from './open-ai-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OpenAiApiService', () => {
  let service: OpenAiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OpenAiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
