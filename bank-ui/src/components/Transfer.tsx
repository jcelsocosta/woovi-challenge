import { centsToReals } from '@/utils/cents_to_reals'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import NavigationLeft from './navigationLeft/navigationLeft'
import NavigationTop from './navigationTop/navigationTop'
import { transferController } from './TransferController'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { ToastAction } from './ui/toast'
import { toast } from './ui/use-toast'

type UserType = {
  userID: string
  firstName: string
  lastName: string
  email: string
}

export interface ITransferProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Transfer({}: ITransferProps) {
  const navigate = useNavigate()
  const [balance, setBalance] = useState<number>(0)
  const [users, setUsers] = useState<UserType[]>([])
  const [receivedID, setReceivedID] = useState<string>('')
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    initComponent()
  }, [])

  function clearFields(): void {
    setBalance(() => 0)
    setReceivedID(() => '')
    setValue(() => '')
  }

  async function initComponent(): Promise<void> {
    await Promise.all([getAccountBalanceByAccountID(), listUsers()])
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
    const { data } = await transferController.getAccountBalanceByAccountID(queryText)

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

  async function listUsers(): Promise<void> {
    const queryText = `
      query ListUsers {
        listUsers {
          users {
            userID
            firstName
            lastName
            email
          }
          error {
            code
            message
          }
        }
      }
    `
    const { data } = await transferController.listUsers(queryText)

    const { listUsers } = data
    if (listUsers && listUsers.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: listUsers.error.message,
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    } else if (listUsers) {
      setUsers(() => listUsers.users)
    }
  }

  async function createTransaction(): Promise<void> {
    const queryText = `
      mutation CreateTransaction {
        createTransaction(receivedUserID: "${receivedID}", value: ${Number(value.replace(/\D/g, ''))}) {
          transaction {
            transactionID
            value
            status 
          }
          error {
            code
            message
          }
        }
      }
    `

    if (!receivedID) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: 'Escolha um usuario para o dinheiro ser transferido',
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })

      return
    }

    if (!value || Number(value.replace(/\D/g, '')) <= 0) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: 'O valor precisa ser informado.',
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })

      return
    }

    const { data } = await transferController.createTranscation(queryText)

    const { createTransaction } = data
    if (createTransaction && createTransaction.error) {
      toast({
        title: 'Messagem de error',
        variant: 'destructive',
        description: createTransaction.error.message,
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    } else if (createTransaction && createTransaction.transaction) {
      toast({
        title: 'Messagem de sucesso!',
        variant: 'default',
        description: 'Dinheiro transferido com sucesso.',
        action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
      })
    }

    clearFields()
    navigate('/home')
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
                  <CardTitle>Transferir</CardTitle>
                  <CardDescription>Saldo disponível R$ {centsToReals(balance.toString())}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-52">
                    <Label htmlFor="balance-id">Valor a ser transferido</Label>
                    <Input
                      id="balance-id"
                      placeholder="Digite o valor"
                      value={value}
                      onChange={(evt) => {
                        if (evt.target.value) {
                          const valueFormatted = evt.target.value.replace(/\D/g, '')
                          setValue(() => centsToReals(valueFormatted))
                        }
                      }}
                    />
                  </div>

                  <div className="mt-10">
                    <h2>Contatos</h2>

                    <div className="mt-2">
                      {users && users.length > 0 && (
                        <RadioGroup defaultValue="comfortable">
                          {users &&
                            users.map((el) => (
                              <div
                                className="flex items-center space-x-2"
                                key={el.userID}
                                onClick={(evt) => {
                                  setReceivedID(() => el.userID)
                                }}
                              >
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">
                                  {el.firstName} {el.lastName}
                                </Label>
                              </div>
                            ))}
                        </RadioGroup>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-6">
                  <Button
                    onClick={async (evt) => {
                      evt.preventDefault()

                      await createTransaction()
                    }}
                  >
                    Confirmar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
