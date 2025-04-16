import { Component, Input } from '@angular/core';
import { InfectionData } from '../inflection-data';
import { InfectionHighlightDirective } from '../directives/infection-highlight.directive';
import { InfectionSummaryPipe } from '../pipes/infection-summary.pipe';

@Component({
  selector: 'app-infection-list',
  imports: [InfectionHighlightDirective, InfectionSummaryPipe],
  templateUrl: './infection-list.component.html',
  styleUrl: './infection-list.component.scss',
})
export class InfectionListComponent {
  @Input() iWantTheTruth: boolean = false;
  @Input() infectionData: InfectionData[] = [];
}
