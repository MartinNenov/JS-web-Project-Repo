import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'posts' , component: PostsPageComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'profile' , component: ProfileComponent},
  {path: 'create-post' , component: CreatePostComponent},
  {path:'**',redirectTo:'register',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
