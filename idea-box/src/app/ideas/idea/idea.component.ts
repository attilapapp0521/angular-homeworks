import { Component, Input } from '@angular/core';
import { Idea } from '../models/idea.model';
import { VoteComponent } from '../vote/vote/vote.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [VoteComponent, MatButtonModule, RouterLink],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  @Input({ required: true }) idea!: Idea;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    console.log(this.idea);
  }

  handleApiResult(event: { success: boolean; error?: string }) {
    if (event.success) {
      this.router.navigateByUrl('/ideas');
    } else {
      console.log(event.error);
    }
  }
}
