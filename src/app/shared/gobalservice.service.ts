import { Injectable } from '@angular/core';
import { MoviePageDetails } from '../shared/movie-page-details.model';
import { MovieDetails } from '../shared/movie-details.model';

@Injectable()
export class GobalserviceService {

  constructor() { }
  userName: string;
  movieReferenceAvailable: boolean;
  key: string;
  SearchValue: string;
  watchedmovieIDs: string[] = [];
  toBeWatchedMovieIDs: string[] = [];
  movieDetails: MovieDetails;
  movieData: MoviePageDetails[] = [];
  searchValue: string = '';

  setUserName(Username: string) {
    this.userName = Username;
  }

  GetUserName() {
    return this.userName;
  }

  setmovieReferenceAvailability(movieReferenceAvailable: boolean) {
    this.movieReferenceAvailable = movieReferenceAvailable;
  }

  getmovieReferenceAvailability() {
    return this.movieReferenceAvailable;
  }

  setMovieRefKey(key: string) {
    this.key = key;

  }

  getMovieRefKey() {
    return this.key;
  }

}
