import { centsToReals } from '@/utils/cents_to_reals'
import AuthContext from '../../context/auth/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { homeController } from './HomeController'
import NavigationLeft from './navigationLeft/navigationLeft'
import NavigationTop from './navigationTop/navigationTop'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

export interface IHomeProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Home({}: IHomeProps) {
  const [balance, setBalance] = useState<number>(0)
  const { isAuth } = useContext(AuthContext)

  useEffect(() => {
    if (isAuth) {
      initComponent()
    }
  }, [isAuth])

  async function initComponent(): Promise<void> {
    await getAccountBalanceByAccountID()
  }

  async function getAccountBalanceByAccountID(): Promise<void> {
    const queryText = `
      query GetAccountBalanceByAccountID {
        getAccountBalanceByAccountID {
          value
          error {
            code
            message
          }
        }
      }
    `
    const { data } = await homeController.getAccountBalanceByAccountID(queryText)

    const { getAccountBalanceByAccountID } = data
    if (getAccountBalanceByAccountID && getAccountBalanceByAccountID.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: getAccountBalanceByAccountID.error.message,
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    } else if (getAccountBalanceByAccountID && getAccountBalanceByAccountID.value) {
      setBalance(() => getAccountBalanceByAccountID.value)
    }
  }

  return (
    <>
      <div className="flex flex-row">
        <div className="w-40">
          <NavigationLeft />
        </div>
        <div className="w-full">
          <NavigationTop />
          <div className="container mx-auto mt-10">
            <Card className="w-40">
              <CardHeader>
                <CardTitle>Saldo da Conta</CardTitle>
                <CardDescription>R$ {centsToReals(balance.toString())}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
