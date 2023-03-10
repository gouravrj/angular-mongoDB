import { Component, Input, OnDestroy, OnInit } from "@angular/core"
import {Subscription} from 'rxjs';
import {Post} from "../post.model"
import {PostsService} from "../posts.service"



@Component({
  selector: 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First post',content: 'This is the first Post\'s content .... '},
  //   {title: 'Second post',content: 'This is the second Post\'s content .... '},
  //   {title: 'Third post',content: 'This is the third Post\'s content .... '},
  // ]
  posts:Post[]=[]
  private postsSub!:Subscription;

  constructor(public postsService: PostsService){}
  ngOnInit(): void {
    this.postsService.getPosts();
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts:Post[])=>{
          this.posts=posts;
        });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId)
  }


  ngOnDestroy(){
      this.postsSub.unsubscribe() ;
  }

}
