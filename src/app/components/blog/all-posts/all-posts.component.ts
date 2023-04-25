import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {Post} from "../../../model/post";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  posts$: Subscription

  constructor(private postService: PostService) {
    this.posts$ = new Subscription();
  }
  ngOnInit() {
    this.posts$ = this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.posts$.unsubscribe();
  }
}
