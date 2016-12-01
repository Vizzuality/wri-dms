import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private metadataSelector: MetadataSelector, private metadataAction: MetadataAction, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.metadataAction.searchMetadatas();
    this.metadatas$ = this.metadataSelector.getMetadata().map((data) => data.map((el) => Object.assign({}, el)));
  }

  edit(metadata: Metadata){
    switch(metadata.attributes.resource.type) {
      case 'dataset':
        this.router.navigate(['../edit/dataset', metadata.attributes.resource.id, metadata.attributes.application, metadata.attributes.language], {relativeTo: this.route});
        break;
      case 'layer':
        this.router.navigate(['../edit/dataset',metadata.attributes.dataset, 'layer', metadata.attributes.resource.id, metadata.attributes.application, metadata.attributes.language], {relativeTo: this.route});
        break;
      case 'layer':
        this.router.navigate(['../edit/dataset',metadata.attributes.dataset, 'widget', metadata.attributes.resource.id, metadata.attributes.application, metadata.attributes.language], {relativeTo: this.route});
        break;
      default:
    }

  }

  delete(metadata){
    this.metadataAction.deleteMetadata(metadata);
  }

}
