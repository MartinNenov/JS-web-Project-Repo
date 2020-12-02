import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileComponent } from './profile/profile.component';

import { FirebaseService } from './services/firebase.service'


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PostComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDq0Ucq-KMhY01EXuaeluF8GQnW-Bliq5M",
      authDomain: "angularprojectdata-d5559.firebaseapp.com",
      databaseURL: "https://angularprojectdata-d5559.firebaseio.com",
      projectId: "angularprojectdata-d5559",
      storageBucket: "angularprojectdata-d5559.appspot.com",
      messagingSenderId: "293920138519",
      appId: "1:293920138519:web:9ad6977455788a51ff0352"
    })
  ],
  providers: [ FirebaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
