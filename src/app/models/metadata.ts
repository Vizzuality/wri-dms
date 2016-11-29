export interface Metadata {
  id: string
  type: string
  attributes: {
    dataset: string
    application: string
    resource: {
      type: string
      id: string
    };
    language: string
    name: string
    description: string;
    source: string
    citation: string
    license: string
    info: any
  };
}
