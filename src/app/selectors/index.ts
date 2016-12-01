import { WidgetSelector } from './widget';
import { LayerSelector } from './layer';
import { DatasetSelector } from './dataset';
import { MetadataSelector } from './metadata';

export var SELECTORS: Array<any> = [
  { provide: MetadataSelector, useClass: MetadataSelector },
  { provide: LayerSelector, useClass: LayerSelector },
  { provide: DatasetSelector, useClass: DatasetSelector },
  { provide: WidgetSelector, useClass: WidgetSelector }
];
