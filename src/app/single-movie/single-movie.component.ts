import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails } from '../shared/movie-details.model';
import { SearchDataEntryServiceService } from '../shared/search-data-entry-service.service';
import { GobalserviceService } from '../shared/gobalservice.service';
import { element } from 'protractor';
import { MovieReferenceDetails } from '../shared/movie-reference-details.model';
import { empty } from 'rxjs/Observer';
import { ToasterService } from '../shared/toaster.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {
  @Input() movieDataResult: MovieDetails;
  movieWatched: boolean;
  movieToBeWatched: boolean;
  removeMovie: boolean;
  gUserName: string;
  movieRefList: MovieReferenceDetails[];
  movieDetails: MovieDetails[];
  movieAviable: boolean;
  movieReferenceAvailable: boolean;

  checkButtonDisable() {

    if (this.gUserName !== '') {
      if (this.movieRefList === undefined || this.movieRefList === null) {
        this.movieToBeWatched = false;
        this.movieWatched = false;
        this.removeMovie = true;
        this.globalvariable.setmovieReferenceAvailability(false);
      }
      const x = this.searchDataEntry.GetMoviebyUserIdandMovieID(this.gUserName);
      x.snapshotChanges().subscribe(item => {
        this.movieRefList = [];
        item.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.movieRefList.push(y as MovieReferenceDetails);
        });

        if (this.movieRefList === undefined) {
          this.movieToBeWatched = false;
          this.movieWatched = false;
          this.removeMovie = true;
          this.globalvariable.setmovieReferenceAvailability(false);

        } else {

          for (let i = 0; i < this.movieRefList.length; i++) {
            const movieSting = (JSON.stringify(this.movieRefList[i]));
            const movieStingTemp = JSON.parse(movieSting);

            if (movieStingTemp.MovieID === this.movieDataResult.imdbID) {

              this.globalvariable.setMovieRefKey(this.movieRefList[i].$key);

              if (movieStingTemp.MovieWatched) { // true movie is watched and present in DB
                this.movieToBeWatched = false;
                this.movieWatched = true;
              } else { // else false movie is not watched and present in DB
                this.movieToBeWatched = true;
                this.movieWatched = false;
              }
              this.globalvariable.setmovieReferenceAvailability(true);
              this.removeMovie = false;
              break;
            } else { // movie not present in DB
              this.movieToBeWatched = false;
              this.movieWatched = false;
              this.removeMovie = true;
              this.globalvariable.setmovieReferenceAvailability(false);
            }
          }
        }
      });
    }

  }

  setMovieStatus(watchStatus: boolean) {

    this.searchDataEntry.getAllMovieDetails();
    const x = this.searchDataEntry.getMovieDetailsByImdbId(this.movieDataResult.imdbID);
    x.snapshotChanges().subscribe(item => {
      this.movieDetails = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        this.movieDetails.push(y as MovieDetails);
      });

      if (this.movieDetails[0] === undefined) {
        // if movie not present in DB set variable to false else if present set variable to true;
        this.movieAviable = false;
      } else {
        this.movieAviable = true;
      }

      if (this.movieAviable === false) { // if movie not available in db inset that value in db
        this.searchDataEntry.InsertMovieDetails(this.movieDataResult);
      }
    });

    this.movieReferenceAvailable = this.globalvariable.getmovieReferenceAvailability();


    if (this.movieReferenceAvailable) {
      this.searchDataEntry.updateMovieReferenceDetails(this.globalvariable.getMovieRefKey(),
      watchStatus, this.movieDataResult.imdbID, this.gUserName);
      this.toaster.successMessage('Updated Successfully');
    } else {
      this.searchDataEntry.InsertMovieReferenceDetails(this.gUserName, this.movieDataResult.imdbID, watchStatus);
      this.toaster.successMessage('Inserted Successfully');
    }

    if (watchStatus) {
      this.movieWatched = true;
      this.movieToBeWatched = false;
    } else {
      this.movieToBeWatched = true;
      this.movieWatched = false;
    }
    this.removeMovie = false;
  }

  constructor(private searchDataEntry: SearchDataEntryServiceService,
    private globalvariable: GobalserviceService, private toaster: ToasterService) {
    this.gUserName = globalvariable.GetUserName();
    this.checkButtonDisable();
  }

  OnDeleteMovie() {
    this.searchDataEntry.removeMovieDataReference(this.globalvariable.getMovieRefKey());
    this.toaster.successMessage('Deleted Successfully');
    this.movieToBeWatched = false;
    this.movieWatched = false;
    this.removeMovie = true;
  }
  ngOnInit() {
  }

}
