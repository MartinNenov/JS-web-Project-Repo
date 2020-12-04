import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userAuth: Subscription;
  public userAuthBool:Boolean;

  @Output() isLogout = new EventEmitter<void>();

  constructor(public fs: FirestoreService,public router: Router) {
    this.userAuth = this.fs.signedIn.subscribe((user) => {
      if (user) {
        this.userAuthBool = true;
      } else {
        this.userAuthBool = false;
      }
    });
  }
 

  ngOnInit(): void {
  }
  signOut() {
    this.fs.signOut();
  }

}
