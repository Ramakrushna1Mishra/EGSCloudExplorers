import { Component } from '@angular/core';
import { PdfParserService } from './../pdf-parser.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent {
  question: string = '';
  pdfFile: File | undefined;

  constructor(private pdfParserService: PdfParserService) {}

  submitSurvey() {
    if (!this.question || !this.pdfFile) {
      alert('Please fill out all fields');
      return;
    }

    // Parse PDF file and extract text
    this.pdfParserService.parsePdf(this.pdfFile)
      .subscribe({
        next: (text: string) => {
          console.log('Parsed text:', text);
          // Process the parsed text further as needed (e.g., NLP)
        },
        error: (error: any) => {
          console.error('Error parsing PDF:', error);
        }
      });

    // Log the submitted data
    console.log('Submitting survey:', this.question, this.pdfFile);
    alert('Survey submitted successfully!'); // Placeholder for actual submission
  }

  onFileChange(event: any) {
    this.pdfFile = event.target.files[0];
  }
}