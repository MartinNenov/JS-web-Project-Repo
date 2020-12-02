import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>();

  constructor(public fs: FirestoreService) {  }

  ngOnInit(): void {
  }
  signOut() {
    this.fs.signOut();
  }

}
