import { sign, verify } from 'jsonwebtoken'

const JWT_TOKEN_SECRET_KEY = '01H9S'

async function signJWT(payload: string): Promise<string> {
  return sign(
    {
      token: payload
    },
    JWT_TOKEN_SECRET_KEY,
    {
      expiresIn: '900s'
    }
  )
}

async function verifyJWT(tokenJWT: string): Promise<any> {
  try {
    return new Promise((resolve, reject) => {
      verify(
        tokenJWT,
        JWT_TOKEN_SECRET_KEY,
        {
          ignoreExpiration: false
        },
        (error, decodedToken) => {
          if (error) {
            reject(error)
          }
          resolve(decodedToken)
        }
      )
    })
  } catch (error) {
    console.error('Error verify JWT.')
    return null
  }
}

async function verifyJWTWithoutExpired(tokenJWT: string): Promise<any> {
  try {
    return new Promise((resolve, reject) => {
      verify(
        tokenJWT,
        JWT_TOKEN_SECRET_KEY,
        {
          ignoreExpiration: true
        },
        (error, decodedToken) => {
          if (error) {
            reject(error)
          }
          resolve(decodedToken)
        }
      )
    })
  } catch (err) {
    console.error('Error verify JWT.')
    return err
  }
}

export {
  signJWT,
  verifyJWT,
  verifyJWTWithoutExpired
}