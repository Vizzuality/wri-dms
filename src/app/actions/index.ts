import { WidgetAction } from './widget';
import { LayerAction } from './layer';
import { DatasetAction } from './dataset';
import { MetadataAction } from './metadata';


export var ACTIONS: Array<any> = [
  { provide: MetadataAction, useClass: MetadataAction },
  { provide: DatasetAction, useClass: DatasetAction },
  { provide: LayerAction, useClass: LayerAction },
  { provide: WidgetAction, useClass: WidgetAction }
];
