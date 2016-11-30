import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class DatasetService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getDatasets(nameFilter){
    let url = `${DatasetService.BASE_URL}/dataset?page[size]=10000`;
    if (nameFilter) {
      url += `&name=${nameFilter}`;
    }
    return this.http.get(url).map(res => res.json() || []);
  }

}
