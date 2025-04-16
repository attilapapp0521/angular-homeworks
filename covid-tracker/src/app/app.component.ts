import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { InfectionListComponent } from './infection-list/infection-list.component';
import { INFECTION_DATA, InfectionData } from './inflection-data';

@Component({
  selector: 'app-root',
  imports: [InfectionListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  infectionData: InfectionData[] = INFECTION_DATA;
  iWantTheTruth: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('window: keydown', ['$event'])
  handleKwyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.key.toLowerCase() === 't') {
      this.iWantTheTruth = !this.iWantTheTruth;
      this.cdr.detectChanges();
      event.preventDefault();
    }
  }
}
