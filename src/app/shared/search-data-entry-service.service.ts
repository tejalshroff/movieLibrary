import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MovieDetails } from '../shared/movie-details.model';

@Injectable()
export class SearchDataEntryServiceService {

  movieRefList: AngularFireList<any>;
  movieDataList: AngularFireList<any>;


  constructor(private firebaseDB: AngularFireDatabase) { }

  GetMoviebyUserIdandMovieID(userkey:  string) {


     this.movieRefList = this.firebaseDB.list('MovieReferenceDetails',ref=> ref.orderByChild('userName').equalTo(userkey));


     return this.movieRefList;
  }


  InsertMovieReferenceDetails(userKey: string, movieId: string, movieWatched: boolean) {
    if (userKey !== '' && movieId !== '') {
      this.movieRefList.push({
        userName: userKey,
        MovieID: movieId,
       MovieWatched: movieWatched
      });
    }
  }

  getAllMovieDetails() {
    this.movieDataList = this.firebaseDB.list('MovieDetails');
    return this.movieDataList;
  }


  getMovieDetailsByImdbId(imdbID: string) {
    this.movieDataList = this.firebaseDB.list('MovieDetails',ref=> ref.orderByChild('imdbID').equalTo(imdbID));
    return this.movieDataList;
    }

  InsertMovieDetails(movieData: MovieDetails) {
    this.movieDataList.push({
      Title: movieData.Title,
      Year: movieData.Year,
      Poster: movieData.Poster,
      Actors: movieData.Actors,
      Writer: movieData.Writer,
      Plot: movieData.Plot,
      imdbID: movieData.imdbID,
      Released: movieData.Released,
      Language: movieData.Language,
      Type: movieData.Type
    });
  }

  updateMovieReferenceDetails(key: string, movieWatched: boolean,MovieID: string,userName: string): void {

    this.movieRefList.update(key, {
      MovieID: MovieID,
      MovieWatched: movieWatched,
      userName: userName
    });

   // this.movieRefList.remove(key);
  }

  removeMovieDataReference(key: string) {
    this.movieRefList.remove(key);
  }
}
