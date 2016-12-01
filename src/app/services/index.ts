import { WidgetService } from './widget.service';
import { LayerService } from './layer.service';
import { DatasetService } from './dataset.service';
import { MetadataService } from './metadata.service';
import { AuthService, TokenService } from './auth.service';


export var SERVICES: Array<any> = [
  { provide: TokenService, useClass: TokenService },
  { provide: AuthService, useClass: AuthService },
  { provide: MetadataService, useClass: MetadataService },
  { provide: LayerService, useClass: LayerService },
  { provide: WidgetService, useClass: WidgetService },
  { provide: DatasetService, useClass: DatasetService }
];
