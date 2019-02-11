import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MoviePageDetails } from '../shared/movie-page-details.model';
import { MovieDetails } from '../shared/movie-details.model';

@Injectable()
export class SearchServiceService {
  moviedata: MoviePageDetails[];
  routingSearchFlag: boolean;

  baseUrl: string = 'http://www.omdbapi.com/?apikey=e1c1d017&';

  constructor(private http: Http) { }

  GetSearchedMovie(searchToken: String): Promise<MoviePageDetails[]> {
    // console.log(this.baseUrl+'s='+searchToken+'&page=5');
    return this.http.get(this.baseUrl + 's=' + searchToken )
      .map((respose: Response) =>
        <MoviePageDetails[]>respose.json().Search).toPromise();
  }

  GetSelectedMovie(movieId: String): Promise<MovieDetails> {
    // console.log(this.baseUrl+'s='+searchToken+'&page=5');
    return this.http.get(this.baseUrl + 'i=' + movieId)
      .map((respose: Response) =>
        <MovieDetails>respose.json()).toPromise();
  }

}
