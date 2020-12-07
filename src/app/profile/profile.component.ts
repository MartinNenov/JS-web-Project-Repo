import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isloggedInUserProfile:boolean;
  uid:string;
  public userAuth: Subscription;
  public userInformation;
  public rating;
  public profileInfoSub: Subscription;
  public postSubs: Subscription;
  public activeUserPosts: Array<any>;
  public nonactiveUserPosts: Array<any>;
  public reviews:Array<any>;

  constructor(
    public fs: FirestoreService,
    public router: Router,
    public ngZone:NgZone,
    private _Activatedroute:ActivatedRoute,
    private utils: UtilsService
  ) { 
    this.userAuth = this.fs.signedIn.subscribe((user) => this.ngZone.run(()=>{
        if (user) {
          
        } else {
          this.router.navigate([ 'signin' ]);
        }
      })
    );
    this.uid=this._Activatedroute.snapshot.paramMap.get("uid");
    (this.uid==utils.getUID())?this.isloggedInUserProfile=true:this.isloggedInUserProfile=false;
    this.profileInfoSub = fs.getUserPersonalData(this.uid).valueChanges().subscribe((result:any)=>this.ngZone.run(()=>{
      this.userInformation = result;
      this.reviews = result.reviews.reduce((acc,curr,index)=>{
        let [posterId,review] = curr.split('|');
        return acc.concat([{posterId,review}]);
      },[]);
      console.log(this.reviews);
      this.rating = +result.upVotes/(+result.upVotes+(+result.downVotes))*100;
    }))
    this.postSubs = fs.getPosts().subscribe(posts=>{
      this.activeUserPosts = posts.filter((post:any)=>{
        return ((post.uid == this.uid)&&(post.active));
      })
      this.nonactiveUserPosts = posts.filter((post:any)=>{
        return ((post.uid == this.uid)&&(!post.active));
      })
    })
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    if(this.userAuth)this.userAuth.unsubscribe();
    if(this.profileInfoSub)this.profileInfoSub.unsubscribe();
  }

}
