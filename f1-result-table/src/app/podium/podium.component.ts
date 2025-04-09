import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-podium',
  imports: [],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.scss',
})
export class PodiumComponent {
  @Input() podium: string[] = [];
}
