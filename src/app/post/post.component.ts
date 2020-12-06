import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { UtilsService } from '../services/utils.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() data : any;
  currentUID : string;

  constructor(public fs: FirestoreService,public utils:UtilsService) { 
    if(utils.getUID()==null){
      utils.setUID(localStorage.getItem('currentUID'));
    }
    this.currentUID=utils.getUID();
  }

  async removePost(post: any) {
    try {
        if (!post) throw new Error('Invalid post');
        const result = await this.fs.deletePost(post.id);
        if (!result) throw new Error('Failed to remove post');
    } catch (error) {
        console.log(error);
        alert('Failed to remove post; something went wrong.');
    }
  }

  async updatePost(post: any,activevalue:boolean) {
    try {
        if (!post) throw new Error('Invalid post');
        const result = await this.fs.updatePost(post.id,activevalue);
        if (!result) throw new Error('Failed to remove post');
    } catch (error) {
        console.log(error);
        alert('Failed to remove post; something went wrong.');
    }
  }

  ngOnInit(): void {
  }

}
