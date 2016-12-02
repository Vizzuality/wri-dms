import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Metadata } from './../../../models/metadata';
import { Observable } from 'rxjs/Observable';
import { MetadataAction } from './../../../actions/metadata';
import { MetadataSelector } from '../../../selectors/metadata';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-metadata-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  metadatas: Metadata[] = []
  metadatasFilter: Metadata[] = []
  metadataSub: Subscription
  user: any = {}
  private searchDatasetStream = new Subject<string>()

  constructor(private metadataSelector: MetadataSelector, private metadataAction: MetadataAction, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.metadataAction.searchMetadatas();
    this.metadataSub = this.metadataSelector.getMetadata().map((data) => data.map((el) => Object.assign({}, el))).subscribe(data => this.metadatas = this.metadatasFilter = data);

    const searchDatasetSource = this.searchDatasetStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => {
        this.metadatasFilter = this.metadatas.filter(d => {
          let val = d.attributes.resource.type.indexOf(term) >= 0 || d.attributes.language.indexOf(term) >= 0 || d.attributes.application.indexOf(term) >= 0 || !term;
          if(!val && d.attributes.name){
            return d.attributes.name.indexOf(term) >= 0;
          }
          return val;
        });
      });
  }

  ngOnDestroy() {
    this.metadataSub.unsubscribe();
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

  updateFilter(value){
    this.searchDatasetStream.next(value)
  }

  delete(metadata){
    this.metadataAction.deleteMetadata(metadata);
  }

}
