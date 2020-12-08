import { Component, NgZone, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  public reviewsRaw:Array<any>;
  public editPIBool:boolean;
  
  public postForm: FormGroup;
  public infoForm: FormGroup;
  public addFailed: boolean;
  public succesAddReview: boolean;
  public review;
  public addInfoFailed:boolean;
  public succesfullyAddedUserInfo: boolean;

  constructor(
    public fs: FirestoreService,
    public router: Router,
    public ngZone:NgZone,
    private _Activatedroute:ActivatedRoute,
    private utils: UtilsService,
    public fb: FormBuilder){ 

    this.addFailed = false;
    this.addInfoFailed = false;
    this.succesAddReview = false;
    this.succesfullyAddedUserInfo = false;
    this.editPIBool=false;

    this.postForm = this.fb.group({
      review: new FormControl('', [Validators.required])
    });

    this.infoForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      imageURL: new FormControl('', [Validators.required])
    });

    this.userAuth = this.fs.signedIn.subscribe((user) => this.ngZone.run(()=>{
        if (user) {
          
        } else {
          this.router.navigate([ 'signin' ]);
        }
      })
    );
    this.uid=this._Activatedroute.snapshot.paramMap.get("uid");
    //console.log(this.uid);
    //console.log(utils.getUID());
    (this.uid==utils.getUID())?this.isloggedInUserProfile=true:this.isloggedInUserProfile=false;
    this.profileInfoSub = fs.getUserPersonalData(this.uid).valueChanges().subscribe((result:any)=>this.ngZone.run(()=>{
      this.userInformation = result;
      if(result){
        this.reviewsRaw = result.reviews;
        this.reviews = result.reviews.reduce((acc,curr,index)=>{
          let [posterId,review] = curr.split('|');
          return acc.concat([{posterId,review}]);
        },[]);
        //console.log(this.reviews);
        this.rating = +result.upVotes/(+result.upVotes+(+result.downVotes))*100;
      }
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

  changeEditInfoBool(){
    this.editPIBool = false;
    console.log(this.editPIBool);
  }

  addReview(fg: FormGroup){
    try{
      if (!fg.valid) throw new Error('Invalid post data');
      this.addFailed = false;
      //console.log(fg.value);
      if(fg.value.review.includes("|")){
        this.addFailed = true;
      }else{
        this.addFailed = false;
        this.succesAddReview = true;
        this.reviewsRaw = this.reviewsRaw.concat([this.utils.getUID()+"|"+fg.value.review]);
        this.fs.getUserPersonalData(this.uid).update({reviews:this.reviewsRaw})
      }
    }catch{
      this.addFailed = true;
    }
    setTimeout(() => {
      this.addFailed = false;
      this.succesAddReview = false;
      this.review = ' ';
    }, 3000);
    //const result = await this.fs.addPost(fg.value);
  }

  upVote():void{
    this.fs.getUserPersonalData(this.uid).update({upVotes:+(this.userInformation.upVotes)+1});
  }

  downVote():void{
    this.fs.getUserPersonalData(this.uid).update({downVotes:+(this.userInformation.downVotes)+1});
  }

  ngOnInit(): void {
    console.log('INIT');
  }

  ngOnChanges():void{
  }

  ngOnDestroy():void{
    if(this.userAuth)this.userAuth.unsubscribe();
    if(this.profileInfoSub)this.profileInfoSub.unsubscribe();
  }

  addInfo(fg: FormGroup){
    try{
      if (!fg.valid) throw new Error('Invalid post data');
      console.log(fg.value);
      this.addFailed = false;
      let {name, city, phone,imageURL} = fg.value;
      let personalData = {
        name:name,
        imageURL:imageURL,
        city:city,
        phone:phone,
        downVotes:0,
        upVotes:0,
        reviews:[]
      };
      this.fs.getPersonalDataRef().doc(this.uid).set(personalData)
      .then((result)=>{
        console.log(result);
      })
      
    }catch{
      this.addFailed = true;
    }
  }

}
