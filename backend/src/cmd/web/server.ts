import { createHandler } from 'graphql-http/lib/use/http'
import Koa from 'koa'
import { PORT } from './config'
import { schema } from './graphql/schema'
import logger from 'koa-logger'

const app = new Koa()
app.use(logger())

function initServerGraphql(): void {
  const handler = createHandler({ schema })

  app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/graphql') {
      ctx.respond = false

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