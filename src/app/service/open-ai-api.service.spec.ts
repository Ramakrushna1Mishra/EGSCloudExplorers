import { TestBed } from '@angular/core/testing';

import { OpenAiApiServiceService } from './open-ai-api.service.service';

describe('OpenAiApiServiceService', () => {
  let service: OpenAiApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAiApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
