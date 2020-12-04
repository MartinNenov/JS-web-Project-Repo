import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public postForm: FormGroup;
  public addFailed: boolean;
  public userAuth: Subscription;
  public postDataSub: Subscription;

  constructor(public fs: FirestoreService,public fb: FormBuilder,public router: Router) {
    this.addFailed = false;

    this.postForm = this.fb.group({
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [ Validators.required]),
      details: new FormControl('', [ Validators.required, Validators.minLength(20) ])
    });
    
    this.userAuth = this.fs.signedIn.subscribe((user) => {
      if (user) {
          
      } else {
          this.router.navigate([ 'signin' ]);
      }
  });
  }
  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.userAuth) this.userAuth.unsubscribe();
    if (this.postDataSub) this.postDataSub.unsubscribe();
  }

  async addPost(fg: FormGroup) {
    try {
        console.log(fg.valid, fg.value);
        if (!fg.valid) throw new Error('Invalid post data');
        this.addFailed = false;
        const result = await this.fs.addPost(fg.value);
        if (result) fg.reset();
        else throw new Error('Failed to add post; Something went wrong');
    } catch (error) {
        console.log(error);
        this.addFailed = true;
    }
  }
}
