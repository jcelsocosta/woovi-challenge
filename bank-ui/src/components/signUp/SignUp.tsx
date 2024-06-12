import LayoutSecondary from '@/layout/Secondary/Secondary'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ToastAction } from '../ui/toast'
import { useToast } from '../ui/use-toast'
import { signUpController } from './SignUpController'

export interface ISignUpProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function SignUp({}: ISignUpProps) {
  const navigate = useNavigate()

  const { toast } = useToast()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [cnpj, setCnpj] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setrepeatPassword] = useState<string>('')

  function validateSignUp(args: any): string | null {
    if (!firstName) return 'Informe o nome.'

    if (!lastName) return 'Informe o sobrenome.'

    if (!cpf && !cnpj) return 'Informe o CPF ou CNPJ'

    if (!email) return 'Informe o email.'

    if (!password) return 'Informe a senha.'

    if (!repeatPassword) return 'Informe a confirmação da senha.'

    if (password && repeatPassword && password !== repeatPassword) return 'As senhas não são iguais.'

    return null
  }

  return (
    <>
      <LayoutSecondary>
        <div className="bg-wooviSecondary bg-opacity-60 h-12">
          <a href="/">
            <h1 className="text-4xl text-white ps-10">Bank</h1>
          </a>
        </div>
        <div className="container mx-auto flex justify-center">
          <div className="flex flex-col text-center w-96 mt-20">
            <h1>Cadastro</h1>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <Input
                placeholder="Primeiro Nome"
                max={150}
                onChange={(evt) => {
                  evt.preventDefault()
                  setFirstName(() => evt.target.value)
                }}
              />
              <Input
                placeholder="Sobrenome"
                required={true}
                max={150}
                onChange={(evt) => {
                  evt.preventDefault()
                  setLastName(() => evt.target.value)
                }}
              />
              <Input
                placeholder="CPF/CNPJ"
                max={20}
                onChange={(evt) => {
                  evt.preventDefault()
                  setCpf(() => evt.target.value)
                }}
              />
              <Input
                placeholder="Email"
                type="email"
                max={200}
                onChange={(evt) => {
                  evt.preventDefault()
                  setEmail(() => evt.target.value)
                }}
              />
              <Input
                placeholder="Password"
                type="password"
                max={20}
                onChange={(evt) => {
                  evt.preventDefault()
                  setPassword(() => evt.target.value)
                }}
              />
              <Input
                placeholder="Repetir Password"
                type="password"
                max={20}
                onChange={(evt) => {
                  evt.preventDefault()
                  setrepeatPassword(() => evt.target.value)
                }}
              />
            </div>
            <Button
              className="mt-6"
              onClick={async (evt) => {
                evt.preventDefault()
                const payload = {
                  firstName,
                  lastName,
                  cpf,
                  cnpj,
                  email,
                  password,
                  repeatPassword
                }

                const errorMessage = validateSignUp(payload)
                if (!errorMessage) {
                  const queryText = `
                    mutation CreateUser {
                      createUser(
                        firstName: "${firstName}",
                        lastName: "${lastName}",
                        CPF: "${cpf}",
                        CNPJ: "${cnpj}",
                        email: "${email}",
                        password: "${password}",
                        repeatPassword: "${repeatPassword}"
                      ) {
                        token
                        error {
                          code
                          message
                        }
                      }
                    }
                  `
                  const { data } = await signUpController.createSignUp(queryText)
                  console.log('data', data)
                  const { createUser } = data

                  if (createUser && createUser.error) {
                    toast({
                      title: 'Messagem de error',
                      variant: 'destructive',
                      description: createUser.error.message,
                      action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
                    })
                  } else if (createUser && createUser.token) {
                    localStorage.setItem('token', createUser.token)

                    navigate('/')
                  }
                } else if (errorMessage) {
                  toast({
                    title: 'Messagem de error',
                    variant: 'destructive',
                    description: errorMessage,
                    action: <ToastAction altText="Goto schedule">Fechar</ToastAction>
                  })
                }
              }}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </LayoutSecondary>
    </>
  )
}
