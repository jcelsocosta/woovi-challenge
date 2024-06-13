import { centsToReals } from '@/utils/cents_to_reals'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { historyController } from './HistoryController'
import NavigationLeft from './navigationLeft/navigationLeft'
import NavigationTop from './navigationTop/navigationTop'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

type TransactionType = {
  transactionID: string
  value: number
  status: string
  sender: number
  received: number
}

export interface IHistoryProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function History({}: IHistoryProps) {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  useEffect(() => {
    initComponent()
  }, [])

  async function initComponent(): Promise<void> {
    await listTransactionsByAccountID()
  }

  async function listTransactionsByAccountID(): Promise<void> {
    const queryText = `
      query ListTransactionsByAccount {
        listTransactionsByAccountID {
          transactions {
            transactionID
            value
            status,
            sender,
            received
          }
          error {
            code
            message
          }
        }
      }
    `
    const { data } = await historyController.listTransactionsByAccountID(queryText)

    const { listTransactionsByAccountID } = data
    if (listTransactionsByAccountID && listTransactionsByAccountID.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: listTransactionsByAccountID.error.message,
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    } else if (listTransactionsByAccountID) {
      setTransactions(() => listTransactionsByAccountID.transactions)
      console.log('adasdad', listTransactionsByAccountID)
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
            <div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Movimentações</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-64">
                    {transactions &&
                      transactions.length &&
                      transactions.map((el) => (
                        <div key={el.transactionID}>
                          {el.sender === 1 ? <span>R$ - {centsToReals(el.value.toString())}</span> : ''}

                          {el.received === 1 ? <span>R$ {centsToReals(el.value.toString())}</span> : ''}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
