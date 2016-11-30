import { DatasetAction } from './dataset';
import { MetadataAction } from './metadata';


export var ACTIONS: Array<any> = [
  { provide: MetadataAction, useClass: MetadataAction },
  { provide: DatasetAction, useClass: DatasetAction }
];
