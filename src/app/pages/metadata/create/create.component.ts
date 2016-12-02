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
  edit: boolean


  private searchDatasetStream = new Subject<string>()
  private searchLayerStream = new Subject<string>()
  private searchWidgetStream = new Subject<string>()

  constructor(private metadataAction: MetadataAction, private metadataSelector: MetadataSelector,private authService: AuthService, private datasetSelector: DatasetSelector, private datasetAction: DatasetAction, private layerSelector: LayerSelector, private layerAction: LayerAction, private widgetSelector: WidgetSelector, private widgetAction: WidgetAction, private formBuilder: FormBuilder, private route: ActivatedRoute) {
      this.paramsSubs = this.route.params.subscribe(params => {
        if (params['idDataset']){
          this.params = params;
          this.metadataAction.loadMetadata(params);
        }
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

      this.metadataForm = this.formBuilder.group({
        application: ['', Validators.required],
        language: ['', Validators.required],
        name: '',
        citation: '',
        description: '',
        license: '',
        source: '',
        info: new FormGroup({})
      });
  }

  ngOnInit() {
    if (this.authService.user.extraUserData) {
      this.applications = this.authService.user.extraUserData.apps;
    }
    if(this.params && this.params.idDataset) {
      this.editSubs = this.metadataSelector.getEdit().subscribe(data => {
        if (data && Object.keys(data).length > 0) {
          this.metadataTemp = Object.assign(this.metadataTemp, data);
          this.selectedResource = {
            id: (<any>data).resource.id,
            type: (<any>data).resource.type,
            dataset: (<any>data).dataset,
            name: (<any>data).name
          }
          this.edit = true;
          this.metadataForm.controls['application'].disable();
          this.metadataForm.controls['language'].disable();
          if (this.metadataTemp.info){
            let keys = Object.keys(this.metadataTemp.info);
            keys.map(key => (<FormGroup>this.metadataForm.controls['info']).addControl(key, new FormControl(this.metadataTemp.info[key])))
          }
        }
      });
    }

    this.datasets$ = this.datasetSelector.getDatasetState();
    this.datasetAction.searchDatasets('');
    this.datasetSubs = this.datasets$.subscribe((data) => this.datasets = data);

    this.layers$ = this.layerSelector.getLayerState();
    this.layerAction.searchLayers('');
    this.layerSubs = this.layers$.subscribe((data) => this.layers = data);

    this.widgets$ = this.widgetSelector.getWidgetState();
    this.widgetAction.searchWidgets('');
    this.widgetSubs = this.widgets$.subscribe((data) => this.widgets = data);

  }

  ngOnDestroy() {
    this.datasetSubs.unsubscribe();
    this.layerSubs.unsubscribe();
    this.widgetSubs.unsubscribe();
    if(this.editSubs){
      this.editSubs.unsubscribe();
    }
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
    if (!this.edit) {
      this.selectedResource = {
        id: resource.id,
        type: type,
        name: resource.attributes.name,
        dataset: resource.attributes.name
      };
    }
  }

  addField(input) {
    if (input && input.value) {
      let name = input.value;
      if (!this.metadataTemp.info) {
        this.metadataTemp.info = {};
      }
      if (this.metadataTemp.info){
        this.metadataTemp.info[name] = '';
        (<FormGroup>this.metadataForm.controls['info']).addControl(name, new FormControl(''));
      }
      input.value = '';
    }
  }

  doSubmit(e) {
    e.preventDefault();
    if (this.metadataForm.valid && this.selectedResource) {
      let metadata = Object.assign({}, this.metadataForm.value);
      metadata.resource = {
        type: this.selectedResource.type,
        id: this.selectedResource.id
      };
      if (this.selectedResource.type !== 'dataset') {
        metadata.dataset = this.selectedResource.dataset;
      }
      if(this.metadataTemp.id) {
        metadata.language = this.metadataTemp.language;
        metadata.application = this.metadataTemp.application;
        this.metadataAction.updateMetadata(this.params, metadata);
      } else {
        this.metadataAction.createMetadata(metadata);
      }
    }
    return false;
  }

}
