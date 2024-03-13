import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { FormsModule } from '@angular/forms'; // Add this line
import { PdfParserService } from './pdf-parser.service';


@NgModule({
  declarations: [
    AppComponent,
    SurveyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PdfParserService //Provide PdfParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
