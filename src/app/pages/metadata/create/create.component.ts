import * as console from 'console';
import { Subject } from 'rxjs/Rx';
import { DatasetAction } from './../../../actions/dataset';
import { IDataset } from './../../../models/dataset';
import { DatasetSelector } from '../../../selectors/dataset';
import { Metadata } from './../../../models/metadata';
import { Observable } from 'rxjs/Observable';
import { MetadataAction } from './../../../actions/metadata';
import { MetadataSelector } from '../../../selectors/metadata';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  datasets$: Observable<IDataset[]>
  datasetSearchValue: string = ''
  selectedResource : any

  private searchTermStream = new Subject<string>()

  constructor(private metadataAction: MetadataAction, private datasetSelector: DatasetSelector, private datasetAction: DatasetAction) {
     const searchSource = this.searchTermStream
      .debounceTime(500)
      .distinctUntilChanged()
      .map(searchTerm => {
        this.datasetSearchValue = searchTerm
        return searchTerm;
      })
      .subscribe(term => this.datasetAction.searchDatasets(term));
  }

  ngOnInit() {
    this.datasets$ = this.datasetSelector.getDatasets();
    this.datasetAction.loadDatasets('');
  }

  searchDataset(terms: string) {
    this.searchTermStream.next(terms)
  }

  selectResource(resource){
    this.selectedResource = resource;
  }

}
