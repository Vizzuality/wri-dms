import { Metadata } from './../models/metadata';
import { Observable } from 'rxjs/Observable';
import { MetadataAction } from './../actions/metadata';
import { MetadataSelector } from '../selectors/metadata';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {

  metadatas$: Observable<Metadata[]>

  constructor(private metadataSelector: MetadataSelector, private metadataAction: MetadataAction) { }

  ngOnInit() {
    this.metadataAction.searchMetadatas();
    this.metadatas$ = this.metadataSelector.getMetadata();
  }

}
