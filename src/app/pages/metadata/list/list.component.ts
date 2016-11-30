import { AuthService } from './../../../services/auth.service';
import { Metadata } from './../../../models/metadata';
import { Observable } from 'rxjs/Observable';
import { MetadataAction } from './../../../actions/metadata';
import { MetadataSelector } from '../../../selectors/metadata';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  metadatas$: Observable<Metadata[]>
  user: any = {}

  constructor(private metadataSelector: MetadataSelector, private metadataAction: MetadataAction, private authService: AuthService) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.metadataAction.searchMetadatas();
    this.metadatas$ = this.metadataSelector.getMetadata().map((data) => data.map((el) => Object.assign({}, el)));
  }

  edit(metadata){
    window.alert(metadata);
  }

  delete(metadata){
    this.metadataAction.deleteMetadata(metadata);
  }

}
