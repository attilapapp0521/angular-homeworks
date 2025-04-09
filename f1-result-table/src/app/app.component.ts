import { Component } from '@angular/core';
import { ResultTableComponent } from './results-table/result-table.component';
import { Result, results } from './results';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [ResultTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  resultsList: Result[] = results;
  f1LogoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {
    this.f1LogoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://images.seeklogo.com/logo-png/33/1/formula-1-logo-png_seeklogo-330361.png'
    );
  }
}
