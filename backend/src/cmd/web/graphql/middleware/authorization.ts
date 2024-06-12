import { verifyJWT } from '../../../../internal/utils/jsonwebtoken'

type ContextGraphqlType = {
  accountID: string | null
}

async function authorizationMiddleware(jwtToken: string): Promise<ContextGraphqlType> {
  const { token } = await verifyJWT(jwtToken)

  const ctx: ContextGraphqlType = {
    accountID: null
  }

  if (!token) {
    return ctx
  } else if (token) {
    const response = JSON.parse(token)

    ctx.accountID = response.accountID
  }
  return ctx
}

export { ContextGraphqlType, authorizationMiddleware }
