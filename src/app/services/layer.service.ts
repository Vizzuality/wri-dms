import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LayerService {

  static BASE_URL: string = `${environment.apiUrl}`;

  constructor(private http: Http) {
  }

  getLayers(nameFilter){
    let url = `${LayerService.BASE_URL}/layer?page[size]=10000`;
    if (nameFilter) {
      url += `&name=${nameFilter}`;
    }
    return this.http.get(url).map(res => res.json() || []);
  }

}
