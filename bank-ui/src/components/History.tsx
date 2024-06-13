import { centsToReals } from '@/utils/cents_to_reals'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { historyController } from './HistoryController'
import NavigationLeft from './navigationLeft/navigationLeft'
import NavigationTop from './navigationTop/navigationTop'
import { Badge } from './ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

type TransactionType = {
  transactionID: string
  createdDate: string
  value: number
  status: string
  sender: number
  received: number
}

export interface IHistoryProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function History({}: IHistoryProps) {
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
            received,
            createdDate
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
                  <div className="w-full">
                    {transactions &&
                      transactions.length &&
                      transactions.map((el) => (
                        <div className="w-full" key={el.transactionID}>
                          {el.sender === 1 ? (
                            <div className="inline-flex">
                              <span>
                                <Badge className="bg-gray-300 text-black">Transferência enviada</Badge> R$ {centsToReals(el.value.toString())} --
                                Data: {moment(el.createdDate).format('DD/MM/YYYY, h:mm:ss a')}
                              </span>
                            </div>
                          ) : (
                            ''
                          )}

                          {el.received === 1 ? (
                            <div className="inline-flex">
                              <span>
                                <Badge className="bg-green-500">Transferência recebida</Badge> R$ {centsToReals(el.value.toString())} -- Data:{' '}
                                {moment(el.createdDate).format('DD/MM/YYYY, h:mm:ss a')}
                              </span>
                            </div>
                          ) : (
                            ''
                          )}
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
