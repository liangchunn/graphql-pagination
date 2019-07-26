declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const graphql: DocumentNode
  export default graphql
}
