import { createHandler } from 'graphql-http/lib/use/http'
import Koa from 'koa'
import { PORT } from './config'
import { schema } from './graphql/schema'
import logger from 'koa-logger'
import { authorizationMiddleware, ContextGraphqlType } from './graphql/middleware/authorization'
import cors from '@koa/cors'

const app = new Koa()

app.use(logger())
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowHeaders: ['x-requested-with, content-type', 'authorization', 'origin', 'accept', 'x-access-token']
}))

function initServerGraphql(): void {
  const handler = createHandler({ schema, async context(req: any, params: any): Promise<any> {
    const headers = req.headers.authorization
    const tokenEncrypted = headers?.split(' ')[1]
    //console.log("headers", headers)
    if (tokenEncrypted) {
      return await authorizationMiddleware(tokenEncrypted)
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