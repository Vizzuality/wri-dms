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
}

