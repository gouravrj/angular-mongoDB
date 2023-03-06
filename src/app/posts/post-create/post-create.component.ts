import { Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms';

import {Post} from '../post.model';
import {PostsService} from "../posts.service"

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']

})

export class PostCreateComponent{

  enteredTitle='';
  enteredContent='';
  // @Output() postsCreated = new EventEmitter<Post>();   //It is an event which can be listened from outside
  //                                               // Also add EventEmitter and Output Decorator in import part

  constructor(public postsService: PostsService){}

  onAddPost(form: NgForm){

    if(form.invalid){
      return;
    }

    // const post:Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };

    this.postsService.addPosts(form.value.title,form.value.content);
    form.resetForm();
  }
}
