import { Component, OnInit, Input, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() data : any;
  currentUID : any;
  profileInfoSub: Subscription;
  reviewPosterInformation;
  data1;

  constructor(public fs: FirestoreService,public utils:UtilsService,public ngZone: NgZone) {
    if(utils.getUID()==null){
      utils.setUID(localStorage.getItem('currentUID'));
    }
    this.currentUID=utils.getUID();
  }

  ngOnInit(): void {
    this.profileInfoSub = this.fs.getUserPersonalData(this.data.posterId).valueChanges().subscribe((result:any)=>this.ngZone.run(()=>{
      this.reviewPosterInformation = result;
    })) 
  }

  OnDestroy(): void {
    if(this.profileInfoSub){this.profileInfoSub.unsubscribe()};
  }

}
