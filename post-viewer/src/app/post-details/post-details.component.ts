import { Component, signal } from '@angular/core';
import { Post } from '../posts/post';

@Component({
  selector: 'app-post-details',
  standalone: false,
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent {
  // Gondolom itt egy id-s service hívás kellet volna, de gyors megoldást kerestem.
  post = signal<Post>(history.state.post);
}
