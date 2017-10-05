import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { Post } from './models/post.model';
import * as PostActions from './actions/post.actions';

interface AppState {
  post: Post;
}
@Component({
  selector: 'app-root',
  styles: [''],
  template: `
    <div *ngIf="post$ | async as p">
      <h2>{{ p.text }}</h2>
      <h4>Votes: {{ p.likes }}</h4>
      <button (click)="upvote()">Upvote</button>
      <button (click)="downvote()">Downvote</button>
      <button (click)="resetPost()">Reset</button>
      <input [(ngModel)]="text">
      <button (click)="editText()" >Change Title</button>
    </div>
  `
})
export class AppComponent {
  post$: Observable<Post>;

  text: string;
  constructor(private store: Store<AppState>) {
    this.post$ = this.store.select('post');
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text));
  }

  resetPost() {
    this.store.dispatch(new PostActions.Reset());
  }
  upvote() {
    this.store.dispatch(new PostActions.Upvote());
  }
  downvote() {
    this.store.dispatch(new PostActions.Downvote());
  }
}
