import { Component, DestroyRef, signal } from '@angular/core';
import { PostService } from './post-service';
import { map, switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from './post';
import { EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts = signal<Post[]>([]);
  constructor(
    private readonly postService: PostService,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.postService
      .getPosts()
      .pipe(
        map((posts) => posts.slice(0, 10)),
        tap((posts) => this.posts.set(posts)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  deletePost(id: number) {
    of(window.confirm('Biztosan törölni akarod?'))
      .pipe(
        switchMap((confirmed) =>
          confirmed ? this.postService.deletePost(id) : EMPTY
        ),
        tap(() => {
          this.posts.update((posts) => posts.filter((post) => post.id !== id));
        })
      )
      .subscribe();
  }
}
