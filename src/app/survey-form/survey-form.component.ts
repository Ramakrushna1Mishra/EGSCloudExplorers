// survey-form.component.ts
import { Component } from '@angular/core';
import { BlobServiceClient, AnonymousCredential } from '@azure/storage-blob';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
})
export class SurveyFormComponent {
  question: string = '';
  pdfFile: File | undefined;

  private readonly blobContainerUrl = 'https://cloudexplorers.blob.core.windows.net/documentcontainer?sp=racwdl&st=2024-03-15T03:30:45Z&se=2024-03-18T11:30:45Z&spr=https&sv=2022-11-02&sr=c&sig=3l7OCCpUY9jxicQKF0jaCH80acpYetBgqlt4DbWXHmE%3D'; // Update with your Azure Blob Storage container URL
  private readonly sasToken = 'sp=racwdl&st=2024-03-15T03:30:45Z&se=2024-03-18T11:30:45Z&spr=https&sv=2022-11-02&sr=c&sig=3l7OCCpUY9jxicQKF0jaCH80acpYetBgqlt4DbWXHmE%3D'; // Update with your SAS token

  constructor() {}

  async submitSurvey() {
    if (!this.question || !this.pdfFile) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Upload PDF file to Azure Blob Storage
      await this.uploadFileToBlobStorage(this.pdfFile);
      alert('PDF document uploaded successfully!');
    } catch (error) {
      console.error('Error uploading PDF document:', error);
      alert('Error uploading PDF document. Please try again later.');
    }
  }

  onFileChange(event: any) {
    this.pdfFile = event.target.files[0];
  }

  private async uploadFileToBlobStorage(file: File) {
    const blobServiceClient = new BlobServiceClient(this.blobContainerUrl, new AnonymousCredential());
    const containerClient = blobServiceClient.getContainerClient('documentcontainer'); // Update with your container name

    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const options = { blobHTTPHeaders: { blobContentType: 'application/pdf' } };

    await blockBlobClient.uploadData(file, options);
  }
}
