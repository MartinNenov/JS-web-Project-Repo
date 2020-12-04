import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})

export class PostsPageComponent implements OnInit, OnDestroy {

  public fsData: Array<any>;
  public userAuth: Subscription;
  public taskDataSub: Subscription;

  constructor(public fs: FirestoreService, public router: Router) { 
    this.fsData = new Array();

    this.userAuth = this.fs.signedIn.subscribe((user) => {
      this.getPostData();
    });
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.userAuth) this.userAuth.unsubscribe();
    if (this.taskDataSub) this.taskDataSub.unsubscribe();
  }

  getPostData() {
    this.taskDataSub = this.fs.getPosts().subscribe((data) => {
        this.fsData = data;
    });
}




}
