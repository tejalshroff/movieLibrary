import { Component, OnInit, Input } from '@angular/core';
import { SearchServiceService } from '../shared/search-service.service';
import { MoviePageDetails } from '../shared/movie-page-details.model';
import { SearchResultComponent } from '../search-result/search-result.component';
import { MovieDetails } from '../shared/movie-details.model';
import { GobalserviceService } from '../shared/gobalservice.service';
import {ToasterService} from '../shared/toaster.service';

@Component({
  selector: 'app-search-feature',
  templateUrl: './search-feature.component.html',
  styleUrls: ['./search-feature.component.css'],
  providers: [SearchServiceService]
})
export class SearchFeatureComponent implements OnInit {

  CheckHomeLink: boolean = false;
  @Input() HomeSearchValue: string;

  constructor(private searchService: SearchServiceService,
    public globalVariable: GobalserviceService, private toaster: ToasterService
  ) {

  }

  OnSearch() {

    if (this.globalVariable.movieDetails) {
      this.globalVariable.movieDetails = null;
    }
    if (this.globalVariable.movieData) {
      this.globalVariable.movieData = null;
    }
   console.log(this.globalVariable.searchValue);
    this.searchService.GetSearchedMovie(this.globalVariable.searchValue)
      .then(
        (data) => {
          if (data != null) {
            this.globalVariable.movieData = data;

          } else if(data === null||data===undefined) {

            console.log('not found');
            this.toaster.errorMessage('Unabe to find movie you are searching!');
          }
        });

  }

  getMovieDetailsForMovieID(movieId: string) {
    console.log('Function Called');
    this.searchService.GetSelectedMovie(movieId).then(
      (data) => {
        if (data != null) {
          this.globalVariable.movieDetails = data;
        }
        if (this.globalVariable.movieDetails !== null) {
          this.globalVariable.movieData = null;

        }
      });
  }

  ngOnInit() {

  }
}
