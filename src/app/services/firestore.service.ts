import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public signedIn: Observable<any>;

  constructor(public fs:AngularFirestore,public auth: AngularFireAuth) {
    this.signedIn = new Observable((subscriber)=>{
      this.auth.onAuthStateChanged(subscriber);
    })
  }

  async signIn(email: string,password: string){
    try{
      if(!email || !password) throw new Error('Invalid email anf/or password');
      await this.auth.signInWithEmailAndPassword(email,password);
      return true;
    } catch(error) {
      console.log('Sign in failed', error);
      return false;
    }
  }

  async signOut(){
    try{
      await this.auth.signOut();
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

  async addPost(data:any){
    try{
      if(!data) throw new Error('Invalid data');
      data.uid = (await this.auth.currentUser).uid;
      let result = await this.fs.collection('posts').add(data);
      return true;
    } catch(error) {
      console.log(error);
      return true;
    }
  }
}
