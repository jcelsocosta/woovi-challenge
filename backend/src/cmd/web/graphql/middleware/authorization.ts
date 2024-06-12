import { verifyJWT } from '../../../../internal/utils/jsonwebtoken'

type ContextGraphqlType = {
  accountID: string | null
}

async function authorizationMiddleware(jwtToken: string): Promise<ContextGraphqlType> {
  const { data, error } = await verifyJWT(jwtToken)
  const ctx: ContextGraphqlType = {
    accountID: null
  }

  if (error) {
    return ctx
  }
  if (data && data.error) {
    return ctx
  } else if (data && data.payload) {
    const { accountID } = JSON.parse(data.payload)

    ctx.accountID = accountID
    return ctx
  }
  return ctx
}

export { ContextGraphqlType, authorizationMiddleware }
