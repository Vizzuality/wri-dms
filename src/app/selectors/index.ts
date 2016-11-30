import { DatasetSelector } from './dataset';
import { MetadataSelector } from './metadata';

export var SELECTORS: Array<any> = [
  { provide: MetadataSelector, useClass: MetadataSelector },
  { provide: DatasetSelector, useClass: DatasetSelector }
];
