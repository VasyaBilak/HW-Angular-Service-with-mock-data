import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './pages/posts/posts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignInComponent } from './components/modals/sign-in/sign-in.component';
import { AddPostComponent } from './components/modals/add-post/add-post.component';
import { SignUpComponent } from './components/modals/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    SignInComponent,
    AddPostComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
