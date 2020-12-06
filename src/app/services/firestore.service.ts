import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public signedIn: Observable<any>;

  constructor(
    public utils: UtilsService,
    public fs:AngularFirestore,
    public auth: AngularFireAuth
    ) {
    this.signedIn = new Observable((subscriber)=>{
      this.auth.onAuthStateChanged(subscriber);
    })
  }

  async signUp({email, adress, name, password, repeatpassword}){
    console.log(email,  password);
    try{
      if(!email || !password) throw new Error('Invalid email anf/or password');
      let result = await this.auth.createUserWithEmailAndPassword(email,password);
      console.log(this.auth);
      if(result){
        localStorage.setItem('currentUID',result.user.uid);
      }
      return true;
    } catch(error) {
      console.log('Sign in failed', error);
      return false;
    }
  }


  async signIn(email: string,password: string){
    try{
      if(!email || !password) throw new Error('Invalid email anf/or password');
      let result = await this.auth.signInWithEmailAndPassword(email,password);
      if(result){
        this.utils.setUID(result.user.uid);
        localStorage.setItem('currentUID',result.user.uid);
      }
      return true;
    } catch(error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  async signOut(){
    try{
      await this.auth.signOut();
      localStorage.removeItem('currentUID');
      return true;
    } catch (error){
      console.log('Sign out failed', error);
      return false;
    }
  }

  getPosts() {
    return this.fs.collection('posts').valueChanges({ idField:'id'});
  }
  
  async deletePost(id: string){
    try {
      if(!id) throw new Error('Invalid Id or data');
      await this.fs.collection('posts').doc(id).delete();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updatePost(id: string,activeValue:boolean){
    try {
      if(!id) throw new Error('Invalid Id or data');
      await this.fs.collection('posts').doc(id).update({active:activeValue});
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addPost(data:any){
    try{
      if(!data) throw new Error('Invalid data');
      data.uid = (await this.auth.currentUser).uid;
      data.active = true;
      let result = await this.fs.collection('posts').add(data);
      return true;
    } catch(error) {
      console.log(error);
      return true;
    }
  }
}
