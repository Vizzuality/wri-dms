import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class MetadataService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getMetadatas(){
    return this.http.get(`${MetadataService.BASE_URL}/metadata`).map(res => res.json() || []);
  }

  deleteMetadata(metadata) {
    let url = null;
    if (metadata.attributes.resource.type === 'dataset') {
      url = `/dataset/${metadata.attributes.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    } else if (metadata.attributes.resource.type === 'widget'){
      url = `/dataset/${metadata.attributes.dataset}/widget/${metadata.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    } else if (metadata.attributes.resource.type === 'layer'){
      url = `/dataset/${metadata.attributes.dataset}/layer/${metadata.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    }
    return this.http.delete(`${MetadataService.BASE_URL}${url}`);
  }

  createMetadata(metadata){
    let url = null;
    if (metadata.resource.type === 'dataset') {
      url = `/dataset/${metadata.resource.id}/metadata`;
    } else if (metadata.resource.type === 'widget'){
      url = `/dataset/${metadata.dataset}/widget/${metadata.resource.id}/metadata`;
    } else if (metadata.resource.type === 'layer'){
      url = `/dataset/${metadata.dataset}/layer/${metadata.resource.id}/metadata`;
    }
    return this.http.post(`${MetadataService.BASE_URL}${url}`, metadata).map(res => res.json());
  }

  updateMetadata(params, metadata){
    let url = null;
    if (!params.idLayer && !params.idWidget) {
      url = `/dataset/${params.idDataset}/metadata?app=${params.app}&language=${params.language}`;
    } else if (params.idWidget){
      url = `/dataset/${params.idDataset}/widget/${params.idWidget}/metadata?app=${params.app}&language=${params.language}`;
    } else if (params.idLayer){
      url = `/dataset/${params.idDatasett}/layer/${params.idLayer}/metadata?app=${params.app}&language=${params.language}`;
    }
    return this.http.patch(`${MetadataService.BASE_URL}${url}`, metadata).map(res => res.json());
  }

  getMetadata(params) {
    let url = null;
    if (!params.idLayer && !params.idWidget) {
      url = `/dataset/${params.idDataset}/metadata?app=${params.app}&language=${params.language}`;
    } else if (params.idWidget){
      url = `/dataset/${params.idDataset}/widget/${params.idWidget}/metadata?app=${params.app}&language=${params.language}`;
    } else if (params.idLayer){
      url = `/dataset/${params.idDatasett}/layer/${params.idLayer}/metadata?app=${params.app}&language=${params.language}`;
    }
    return this.http.get(`${MetadataService.BASE_URL}${url}`).map(res => res.json()).map(res => res.data[0]);
  }

}
