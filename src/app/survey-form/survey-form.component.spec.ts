import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SurveyFormComponent } from './survey-form.component';

describe('SurveyFormComponent', () => {
  let component: SurveyFormComponent;
  let fixture: ComponentFixture<SurveyFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show an alert if no PDF file is selected', () => {
    spyOn(window, 'alert');
    component.submitSurvey();
    expect(window.alert).toHaveBeenCalledWith('Please fill out all fields');
  });

  it('should upload the PDF file to Azure Blob Storage', async () => {
    spyOn(window, 'alert');
    component.pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });

    await component.submitSurvey();

    expect(window.alert).toHaveBeenCalledWith('PDF document uploaded successfully!');
  });

  // it('should show an alert if an error occurs during file upload', async () => {
  //   spyOn(window, 'alert');
  //   spyOn(console, 'error').and.stub(); // Stub console.error to prevent actual logging

  //   component.pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
  //   spyOn(component, 'uploadFileToBlobStorage').and.throwError('Mock error');

  //   await component.submitSurvey();

  //   expect(window.alert).toHaveBeenCalledWith('Error uploading PDF document. Please try again later.');
  // });
});
