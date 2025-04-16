import { Pipe, PipeTransform } from '@angular/core';
import { InfectionData } from '../inflection-data';

@Pipe({
  name: 'infectionSummary',
})
export class InfectionSummaryPipe implements PipeTransform {
  transform(value: InfectionData, isTheTruth = false): string {
    if (isTheTruth) {
      return this.formatInfectonSummaryText(
        value.tests,
        value.newCases,
        value.hospitalized
      );
    }

    return this.formatInfectonSummaryText(
      value.tests * 2,
      value.newCases,
      Math.round(value.hospitalized / 3)
    );
  }

  private formatInfectonSummaryText(
    tests: number,
    newCases: number,
    hospitalized: number
  ): string {
    return `Ezen a napon ${tests} mintavétel történt, ${newCases} új fertőzöttet azonosítottak, ${hospitalized} oltatlan idős krónikus beteg volt kórházban.`;
  }
}
