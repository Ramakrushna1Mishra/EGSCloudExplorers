import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as pdfjs from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class PdfParserService {

  constructor() {
    pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.js'; // Specify the path to pdf.worker.js
  }

  parsePdf(pdfFile: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.parsePdfArrayBuffer(arrayBuffer)
          .subscribe({
            next: (text) => {
              observer.next(text);
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            }
          });
      };

      reader.onerror = (error) => {
        observer.error(error);
      };

      reader.readAsArrayBuffer(pdfFile);
    });
  }

  private parsePdfArrayBuffer(arrayBuffer: ArrayBuffer): Observable<string> {
    return new Observable<string>((observer) => {
      pdfjs.getDocument(arrayBuffer).promise
        .then((pdf) => {
          const numPages = pdf.numPages;
          const pageTextPromises: Promise<string>[] = [];

          for (let i = 1; i <= numPages; i++) {
            pageTextPromises.push(
              pdf.getPage(i).then((page) => page.getTextContent())
                .then((content) => content.items.map((item: any) => item.str).join(' '))
            );
          }

          Promise.all(pageTextPromises)
            .then((pageTexts) => observer.next(pageTexts.join(' ')))
            .catch((error) => observer.error(error))
            .finally(() => observer.complete());
        })
        .catch((error) => observer.error(error));
    });
  }
}