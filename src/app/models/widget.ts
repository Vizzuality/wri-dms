export interface IWidget {
  id: string
  type: string
  attributes: {
    name: string
    slug: string
    userId: string
    dataset: string
    default: boolean
    published: boolean
    verified: boolean
    application: string[]
    queryUrl: string
    source: string
  };
}
