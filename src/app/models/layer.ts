export interface ILayer {
  id: string
  type: string
  attributes: {
    name: string
    slug: string
    userId: string
    dataset: string
    default: boolean
    application: string[]
    provider: string
    description: string
  };
}
