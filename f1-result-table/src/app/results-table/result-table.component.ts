import { Component, Input } from '@angular/core';
import { Result } from '../results';
import { CommonModule } from '@angular/common';
import { PodiumComponent } from '../podium/podium.component';

@Component({
  selector: 'app-result-table',
  imports: [CommonModule, PodiumComponent],
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.scss',
})
export class ResultTableComponent {
  @Input() results: Result[] = [];

  selectedRankPlatform?: string[];
  selectedRow?: number | null;

  isHide = false;

  setSelectRow(index: number, result: Result) {
    this.isHide = false;
    this.selectedRow = index;
    this.selectedRankPlatform = result.podium;
  }

  hideDrivers() {
    this.selectedRow = null;
    this.selectedRankPlatform = undefined;
    this.isHide = true;
  }
}
