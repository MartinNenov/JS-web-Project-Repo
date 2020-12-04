import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userAuth: Subscription;

  constructor(public fs: FirestoreService,public router: Router) { 
    this.userAuth = this.fs.signedIn.subscribe((user) => {
      if (user) {
          
      } else {
          this.router.navigate([ 'signin' ]);
      }
    });
  }

  ngOnInit(): void {
  }

}
