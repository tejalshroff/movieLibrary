import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { SearchServiceService } from '../shared/search-service.service';
import { MoviePageDetails } from '../shared/movie-page-details.model';
import { MovieDetails } from '../shared/movie-details.model';
import {SearchFeatureComponent } from '../search-feature/search-feature.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [SearchServiceService]
})

export class SearchResultComponent implements OnInit {

  @Input() movieDataItem: MoviePageDetails;
  searchValue: string;
  movieId: string;
   movieDetails: MovieDetails;
 searchFeature: SearchFeatureComponent;
 @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private searchService: SearchServiceService) {

  }

  GetMovieId(imdbID: string) {

    this.notify.emit(imdbID);

  }


  ngOnInit() {

  }
}
