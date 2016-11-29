import { MetadataService } from './metadata.service';
import { AuthService, TokenService } from './auth.service';


export var SERVICES: Array<any> = [
  { provide: TokenService, useClass: TokenService },
  { provide: AuthService, useClass: AuthService },
  { provide: MetadataService, useClass: MetadataService }
];
