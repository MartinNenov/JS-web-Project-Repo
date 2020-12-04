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
    console.log('utils.getUID():'+utils.getUID());
    if(utils.getUID()==null){
      utils.setUID(localStorage.getItem('currentUID'));
    }
    this.currentUID=utils.getUID();
    console.log(this.currentUID);
  }

  async removePost(task: any) {
    try {
        if (!task) throw new Error('Invalid task');
        const result = await this.fs.deletePost(task.id);
        if (!result) throw new Error('Failed to remove task');
    } catch (error) {
        console.log(error);
        alert('Failed to remove task; something went wrong.');
    }
  }

  ngOnInit(): void {
  }

}
