import { createHandler } from 'graphql-http/lib/use/http'
import Koa from 'koa'
import { PORT } from './config'
import { schema } from './graphql/schema'
import logger from 'koa-logger'
import { authorizationMiddleware, ContextGraphqlType } from './graphql/middleware/authorization'
 
const app = new Koa()
app.use(logger())

function initServerGraphql(): void {
  const handler = createHandler({ schema, async context(req: any, params: any): Promise<any> {
    const headers = req.headers.authorization
    const tokenEncrypted = headers?.split(' ')[1]

    if (tokenEncrypted) {

      return authorizationMiddleware(tokenEncrypted)
    }

    const output:ContextGraphqlType = {
      accountID: null
    }

    return output
  }})

  app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/graphql') {
      await handler(ctx.req, ctx.res)
    } else {
      await next()
    }
  })

  app.listen(PORT, () => {
    console.log(`Server on ${PORT}`)
  })
}

export { initServerGraphql }