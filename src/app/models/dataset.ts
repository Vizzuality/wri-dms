export interface IDataset {
  id: string
  type: string
  attributes: {
    name: string
    application: string[]
    subtitle: string
    dataPath: string
    provider: string;
    connectorUrl: string
    tableName: string
    attributesPath: string
    userId: string
  };
}
