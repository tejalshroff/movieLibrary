import { Component, OnInit, ViewChild } from '@angular/core';
import { GobalserviceService } from '../shared/gobalservice.service';
import { SearchDataEntryServiceService } from '../shared/search-data-entry-service.service';
import { MovieReferenceDetails } from '../shared/movie-reference-details.model';
import { SearchServiceService } from '../shared/search-service.service';
import { MoviePageDetails } from '../shared/movie-page-details.model';
import { MovieDetails } from '../shared/movie-details.model';
import { SearchFeatureComponent } from '../search-feature/search-feature.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  providers: [SearchServiceService]
})

export class MovieSearchComponent implements OnInit {

  userName: string;
  countWatched: number = 0;
  countToBeWatched: number = 0;
  movieRefList: MovieReferenceDetails[];
  homeNavigation: boolean;
  singleMovieData: MoviePageDetails;
  searchValue: string;
  movieDetails: MovieDetails[];



  getMovieCount() {
    const x = this.searchDataEntry.GetMoviebyUserIdandMovieID(this.userName);
    x.snapshotChanges().subscribe(item => {
      this.movieRefList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.movieRefList.push(y as MovieReferenceDetails);
      });
      this.countWatched = 0;
      this.countToBeWatched = 0;
      this.globalVariable.watchedmovieIDs = [];
      this.globalVariable.toBeWatchedMovieIDs = [];
      for (let i = 0; i < this.movieRefList.length; i++) {
        const movieSting = (JSON.stringify(this.movieRefList[i]));
        const movieStingTemp = JSON.parse(movieSting);
        if (movieStingTemp.MovieWatched) {

          if( this.globalVariable.watchedmovieIDs.includes(movieStingTemp.MovieID) === false) {
            this.globalVariable.watchedmovieIDs.push(movieStingTemp.MovieID);
          }
          this.countWatched++;

        } else {
          this.countToBeWatched++;

          this.globalVariable.toBeWatchedMovieIDs.push(movieStingTemp.MovieID);
        }
      }

    });
  }

  ClickedHome() {
    this.globalVariable.movieData = [];
    this.globalVariable.movieDetails = null;
    this.globalVariable.searchValue='';
  }

  constructor(public globalVariable: GobalserviceService,
    private searchDataEntry: SearchDataEntryServiceService,
    private searchService: SearchServiceService) {
    this.userName = globalVariable.GetUserName();
    this.countWatched = 0;
    this.countToBeWatched = 0;
    this.globalVariable.watchedmovieIDs = null;
    this.globalVariable.toBeWatchedMovieIDs = null;
    this.getMovieCount();

  }

  onWatchedMovies() {

    this.globalVariable.searchValue='';
    if (this.globalVariable.movieDetails !== null) {
      this.globalVariable.movieDetails = null;
    }

    this.globalVariable.movieData = [];
    const x = this.searchDataEntry.getAllMovieDetails();
    x.snapshotChanges().subscribe(item => {
      this.movieDetails = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.movieDetails.push(y as MovieDetails);

      });

      for (const movieid of this.globalVariable.watchedmovieIDs) {
        for (let i = 0; i < this.movieDetails.length; i++) {
          const movieSting = (JSON.stringify(this.movieDetails[i]));
          const movieStingTemp = JSON.parse(movieSting);

          if (movieid === movieStingTemp.imdbID) {
            this.singleMovieData = {
              imdbID: movieStingTemp.imdbID,
              Poster: movieStingTemp.Poster,
              Title: movieStingTemp.Title,
              Type: movieStingTemp.Type,
              Year: movieStingTemp.Year,
            };

            if (this.globalVariable.movieData.includes(this.singleMovieData) === false) {
              this.globalVariable.movieData.push(this.singleMovieData);
            }
          }
        }
      }

    });
  }

  getMovieDetailsForMovieID(movieId: string) {

    this.searchService.GetSelectedMovie(movieId).then(
      (data) => {
        if (data != null) {
          this.globalVariable.movieDetails = data;
          this.globalVariable.setmovieReferenceAvailability(true);
        }
        if (this.globalVariable.movieDetails !== null) {
          this.globalVariable.movieData = null;

        }
      });
  }

  onToBeWatchedMovies() {
    this.globalVariable.searchValue='';
    if (this.globalVariable.movieDetails !== null) {
      this.globalVariable.movieDetails = null;
    }

    this.globalVariable.movieData = [];
    const x = this.searchDataEntry.getAllMovieDetails();
    x.snapshotChanges().subscribe(item => {
      this.movieDetails = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.movieDetails.push(y as MovieDetails);
      });

      for (const movieid of this.globalVariable.toBeWatchedMovieIDs) {
        for (let i = 0; i < this.movieDetails.length; i++) {
          const movieSting = (JSON.stringify(this.movieDetails[i]));
          const movieStingTemp = JSON.parse(movieSting);
          if (movieid === movieStingTemp.imdbID) {
            this.singleMovieData = {
              imdbID: movieStingTemp.imdbID,
              Poster: movieStingTemp.Poster,
              Title: movieStingTemp.Title,
              Type: movieStingTemp.Type,
              Year: movieStingTemp.Year,
            };

            if (this.globalVariable.movieData.includes(this.singleMovieData) === false) {
              this.globalVariable.movieData.push(this.singleMovieData);
            }
          }
        }
      }
    });
  }


  ngOnInit() {
  }

}
