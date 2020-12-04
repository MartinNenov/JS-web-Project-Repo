import { Component, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userAuth: Subscription;
  public userAuthBool: boolean;
  public console: any;

  @Output() isLogout = new EventEmitter<void>();

  constructor(public fs: FirestoreService,public router: Router,private cdRef:ChangeDetectorRef,public ngZone:NgZone) {
    this.onRender()
  }

  onRender(){
    this.userAuth = this.fs.signedIn.subscribe((user) => this.ngZone.run(()=>{
      this.console = console;
      this.userAuthBool = false;
      if (user) {
        this.userAuthBool = true;
      } else {
        this.userAuthBool = false;
      }
      this.cdRef.detectChanges();
    }));
  }
 

  ngOnInit(): void {
    setTimeout(() => this.onRender(), 0);
  }
  ngOnDestroy() {
    if (this.userAuth) this.userAuth.unsubscribe();
  }
  signOut() {
    this.fs.signOut();
    setTimeout(()=>{    this.router.navigate([ 'register' ]);}, 20)
  }
}
