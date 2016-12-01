import { ActivatedRoute } from '@angular/router';
import { TokenService, AuthService } from './../../../services/auth.service';
import { IWidget } from './../../../models/widget';
import { WidgetAction } from './../../../actions/widget';
import { WidgetSelector } from './../../../selectors/widget';
import { ILayer } from './../../../models/layer';
import { LayerAction } from './../../../actions/layer';
import { LayerSelector } from './../../../selectors/layer';
import { Subject } from 'rxjs/Rx';
import { DatasetAction } from './../../../actions/dataset';
import { IDataset } from './../../../models/dataset';
import { DatasetSelector } from '../../../selectors/dataset';
import { Metadata } from './../../../models/metadata';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MetadataAction } from './../../../actions/metadata';
import { MetadataSelector } from '../../../selectors/metadata';
import { State as DataseState } from './../../../reducers/dataset';
import { State as WidgetState } from './../../../reducers/widget';
import { State as LayerState } from './../../../reducers/layer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-metadata-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  datasets$: Observable<DataseState>
  datasets: DataseState = null
  datasetSubs: Subscription
  datasetSearchValue: string = ''

  layers$: Observable<LayerState>
  layers: LayerState = null
  layerSubs: Subscription
  layerSearchValue: string = ''

  widgets$: Observable<WidgetState>
  widgets: WidgetState = null
  widgetSubs: Subscription
  widgetSearchValue: string = ''

  editSubs: Subscription
  paramsSubs: Subscription

  params: any

  selectedResource : any
  selectedType : string
  metadataForm: FormGroup
  metadataTemp: any = {}
  languages: string[] = ['es', 'en', 'fr']
  applications: string[]

  private searchDatasetStream = new Subject<string>()
  private searchLayerStream = new Subject<string>()
  private searchWidgetStream = new Subject<string>()

  constructor(private metadataAction: MetadataAction, private metadataSelector: MetadataSelector,private authService: AuthService, private datasetSelector: DatasetSelector, private datasetAction: DatasetAction, private layerSelector: LayerSelector, private layerAction: LayerAction, private widgetSelector: WidgetSelector, private widgetAction: WidgetAction, private formBuilder: FormBuilder, private route: ActivatedRoute) {
      this.paramsSubs = this.route.params.subscribe(params => {
        this.params = params;
        this.metadataAction.loadMetadata(params);
      });

     const searchDatasetSource = this.searchDatasetStream
      .debounceTime(500)
      .distinctUntilChanged()
      .map(searchTerm => {
        this.datasetSearchValue = searchTerm
        return searchTerm;
      })
      .subscribe(term => this.datasetAction.searchDatasets(term));

      const searchLayerSource = this.searchLayerStream
      .debounceTime(500)
      .distinctUntilChanged()
      .map(searchTerm => {
        this.layerSearchValue = searchTerm
        return searchTerm;
      })
      .subscribe(term => this.layerAction.searchLayers(term));

      const searchWidgetSource = this.searchLayerStream
      .debounceTime(500)
      .distinctUntilChanged()
      .map(searchTerm => {
        this.widgetSearchValue = searchTerm
        return searchTerm;
      })
      .subscribe(term => this.widgetAction.searchWidgets(term));
  }

  ngOnInit() {
    if (this.authService.user.extraUserData) {
      window.console.log(this.authService.user);
      this.applications = this.authService.user.extraUserData.apps;
    }


    this.editSubs = this.metadataSelector.getEdit().do(x => window.console.log('metadata', x)).subscribe(data => {
      if (data) {
        this.metadataTemp = data;
        this.selectedResource = data;
      }
    });

    this.datasets$ = this.datasetSelector.getDatasetState();
    this.datasetAction.searchDatasets('');
    this.datasetSubs = this.datasets$.subscribe((data) => this.datasets = data);

    this.layers$ = this.layerSelector.getLayerState();
    this.layerAction.searchLayers('');
    this.layerSubs = this.layers$.subscribe((data) => this.layers = data);

    this.widgets$ = this.widgetSelector.getWidgetState();
    this.widgetAction.searchWidgets('');
    this.widgetSubs = this.widgets$.subscribe((data) => this.widgets = data);

    this.metadataForm = this.formBuilder.group({
      application: ['', Validators.required],
      language: ['', Validators.required],
      name: '',
      citation: '',
      description: '',
      license: '',
      source: ''
    });

  }

  ngOnDestroy() {
    this.datasetSubs.unsubscribe();
    this.layerSubs.unsubscribe();
    this.widgetSubs.unsubscribe();
    this.editSubs.unsubscribe();
    this.paramsSubs.unsubscribe();
  }

  searchDataset(terms: string) {
    this.searchDatasetStream.next(terms)
  }

  searchLayer(terms: string) {
    this.searchLayerStream.next(terms)
  }

  searchWidget(terms: string) {
    this.searchWidgetStream.next(terms)
  }

  selectResource(resource, type){
    this.selectedResource = resource;
    this.selectedType = type;
  }

  doSubmit(e) {
    e.preventDefault();
    if (this.metadataForm.valid && this.selectedResource) {
      let metadata = Object.assign({}, this.metadataTemp);
      metadata.resource = {
        type: this.selectedType,
        id: this.selectedResource.id
      };
      if(this.metadataTemp.id) {
        this.metadataAction.updateMetadata(this.params, metadata);
      } else {
        this.metadataAction.createMetadata(metadata);
      }
    }
    return false;
  }

}
