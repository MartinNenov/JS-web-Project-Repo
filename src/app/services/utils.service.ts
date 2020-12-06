import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private user={
    uid:null
  };


  constructor() { }

  setUID(uid){
    this.user.uid = uid;
  }

  getUID():string{
    return this.user.uid;
  }
  
}
