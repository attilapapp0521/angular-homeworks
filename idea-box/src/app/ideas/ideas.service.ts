import { Injectable } from '@angular/core';
import { Idea } from './models/idea.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewIdea } from './models/new-idea.model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  private readonly BASE_URL = `${environment.baseUrl}/ideas`;

  constructor(private readonly http: HttpClient) {}

  listIdeas(username: string | undefined) {
    if (environment.mockAuthEnabled && username) {
      return of(this.getAllIdeas(username));
    }
    return this.http.get<Idea[]>(`${this.BASE_URL}`);
  }

  voteIdea(idea: Idea, username: string | undefined, vote: string) {
    if (environment.mockAuthEnabled && username) {
      this.storeIdea({ ...idea, votes: vote === 'upVote' ? ++idea.votes : --idea.votes }, username);
      return of({ id: idea.id });
    }
    return this.http.patch<{ id: string }>(
      `${this.BASE_URL}/${idea.id}/upvote`,
      null
    );
  }


  deleteIdea(idea: Idea, username: string | undefined) {
    if (environment.mockAuthEnabled && username) {
      const ideas: Idea[] = this.getAllIdeas(username).filter(
        (i) => i.id !== idea.id
      );

      this.saveIdeas(username, ideas);
      return of({ id: idea.id });
    }
    return this.http.delete<{ id: string }>(`${this.BASE_URL}/${idea.id}`);
  }

  createIdea(idea: NewIdea, username: string | undefined) {
    if (environment.mockAuthEnabled && username) {
      const newIdea: Idea = { ...idea, id: crypto.randomUUID(), votes: 0 };
      this.storeIdea(newIdea, username);

      return of(newIdea);
    }
    return this.http.post<Idea>(`${this.BASE_URL}`, idea);
  }

  editIdea(id: string, idea: NewIdea, username: string | undefined) {
    if (environment.mockAuthEnabled && username) {
      const oldIdea = this.getIdeaById(username, id);

      return oldIdea.pipe(
        map((i) => i?.votes ?? 0),
        map((votes) => {
          const newIdea: Idea = { ...idea, id, votes };
          this.storeIdea(newIdea, username);
          return newIdea;
        })
      );
    }
    return this.http.put<Idea>(`${this.BASE_URL}/${id}`, idea);
  }

  storeIdea(idea: Idea, username: string): void {
    if (!username) return;

    const ideas = this.getAllIdeas(username);
    const index = ideas.findIndex((i) => i.id === idea.id);
    let updateIdeas: Idea[];

    if(index === -1){
      updateIdeas = [...ideas, idea];
    }else {
      updateIdeas = ideas.map(item =>
      item.id === idea.id ? idea : item);
    }

    this.saveIdeas(username, updateIdeas);
  }

  saveIdeas(username: string, ideas: Idea[]): void {
    localStorage.setItem(username, JSON.stringify(ideas));
  }

  getAllIdeas(username: string): Idea[] {
    const ideas = localStorage.getItem(username);
    if (ideas) {
      return JSON.parse(ideas);
    }

    return [] as Idea[];
  }

  getIdeaById(id: string, username: string | undefined) {
    console.log(username);

    if (environment.mockAuthEnabled && username) {
      console.log(this.getAllIdeas(username).find((idea) => idea.id === id));

      return of(this.getAllIdeas(username).find((idea) => idea.id === id));
    }

    return this.http.get<Idea>(`${this.BASE_URL}/${id}`);
  }
}
