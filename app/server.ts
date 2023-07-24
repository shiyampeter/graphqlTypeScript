import 'reflect-metadata'
import Express from 'express'
import * as dotenv from 'dotenv'
import { connect } from 'mongoose'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

// resolvers
import { ProductResolver } from './resolvers/product'
import { CategoryResolver } from './resolvers/category'

dotenv.config()

const main = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [CategoryResolver, ProductResolver],
    emitSchemaFile: true,
    validate: false
  })

  // create database connection
  await connect(process.env.MONGO_URL ?? '', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const server = new ApolloServer({ schema })
  const app = Express()
  server.applyMiddleware({ app: app as any })

  const port: string = process.env.PORT ?? '8000'

  app.listen({ port }, () => {
    const apiPath = `http://localhost:${port}${server.graphqlPath}`
    console.log(`🚀 Server ready and listening at => ${apiPath}`)
  })
}
main().catch((error) => {
  console.log(error, 'error')
})
