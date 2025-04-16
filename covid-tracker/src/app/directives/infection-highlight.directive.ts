import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { InfectionData } from '../inflection-data';

@Directive({
  selector: '[appInfectionHighlight]',
})
export class InfectionHighlightDirective implements OnChanges {
  private _infectionData?: InfectionData;
  private _thresholdPercentage: number = 2.5;

  @Input('appInfectionHighlight') set infectionData(value: InfectionData) {
    this._infectionData = value;
  }
  get infectionData(): InfectionData | undefined {
    return this._infectionData;
  }

  @Input() thresholdPercentage: number = 2.5;
  @Input() iWantTheTruth: boolean = false;

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.formatInfectionData();
  }

  private formatInfectionData(): void {
    if (this.iWantTheTruth) {
      // Ha az igazságot jelenítjük, a háttérszín legyen kék
      this.element.nativeElement.style.backgroundColor = 'blue';
      this.element.nativeElement.style.color = 'white'; // Szöveg legyen látható
    } else {
      // Egyébként alapértelmezett háttérszín
      this.element.nativeElement.style.backgroundColor = '';
      // Szöveg színe a pozitivitási arány alapján
      const isCritical = this.isPositivityAboveThreshold();
      this.element.nativeElement.style.color = isCritical ? 'red' : 'green';
    }
  }

  private isPositivityAboveThreshold(): boolean {
    if (!this._infectionData || this._infectionData.tests === 0) {
      return false;
    }
    return (
      (this._infectionData.newCases / this._infectionData.tests) * 100 >
      this.thresholdPercentage
    );
  }
}
