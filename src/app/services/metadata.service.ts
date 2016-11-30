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
    let url = `/dataset`;
    if (metadata.attributes.resource.type === 'dataset') {
      url = `/dataset/${metadata.attributes.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    } else if (metadata.attributes.resource.type === 'widget'){
      url = `/dataset/${metadata.attributes.dataset}/widget/${metadata.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    } else if (metadata.attributes.resource.type === 'layer'){
      url = `/dataset/${metadata.attributes.dataset}/layer/${metadata.resource.id}/metadata?application=${metadata.attributes.application}&language=${metadata.attributes.language}`;
    }
    return this.http.delete(`${MetadataService.BASE_URL}${url}`);
  }

}
