import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { environment } from '../environments/environment';

import { LoginServiceService } from './shared/login-service.service';
import { UserdetailsService } from './shared/userdetails.service';
import { GobalserviceService } from './shared/gobalservice.service';
import { SearchDataEntryServiceService } from './shared/search-data-entry-service.service';

import { SearchFeatureComponent } from './search-feature/search-feature.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SingleMovieComponent } from './single-movie/single-movie.component';
import { ToasterService } from './shared/toaster.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginUserComponent },
  { path: 'moviesearch', component: MovieSearchComponent },
  { path: 'moviesearchFeature', component: SearchFeatureComponent },
  // {path:'about',component:},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    MovieSearchComponent,
    SearchFeatureComponent,
    SearchResultComponent,
    SingleMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    LoginServiceService,
    UserdetailsService,
    GobalserviceService,
    SearchDataEntryServiceService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
