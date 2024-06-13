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
  const [tax, setTax] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setrepeatPassword] = useState<string>('')

  function validateSignUp(args: any): string | null {
    if (!args.firstName) return 'Informe o nome.'

    if (!args.lastName) return 'Informe o sobrenome.'

    if (!args.cpf && !args.cnpj) return 'Informe o CPF ou CNPJ'

    if (!args.email) return 'Informe o email.'

    if (!args.password) return 'Informe a senha.'

    if (!args.repeatPassword) return 'Informe a confirmação da senha.'

    if (args.password && args.repeatPassword && args.password !== args.repeatPassword) return 'As senhas não são iguais.'

    return null
  }

  return (
    <>
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
              maxLength={18}
              minLength={14}
              value={tax}
              onChange={(evt) => {
                evt.preventDefault()

                if (evt.target.value) {
                  const current = evt.target.value.replace(/\D/g, '')

                  if (current && current.length <= 11) {
                    setCnpj(() => '')
                    let target = current
                    target = target.replace(/(\d{3})(\d)/, '$1.$2')
                    target = target.replace(/(\d{3})(\d)/, '$1.$2')
                    target = target.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                    setTax(() => target)
                    setCpf(() => target)
                  } else if (current && current.length > 11) {
                    setCpf(() => '')
                    let target = current

                    target = target.replace(/(\d{2})(\d)/, '$1.$2')
                    target = target.replace(/(\d{3})(\d)/, '$1.$2')
                    target = target.replace(/(\d{3})(\d)/, '$1/$2')
                    target = target.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
                    setTax(() => target)
                    setCnpj(() => target)
                  }
                } else {
                  setTax(() => evt.target.value.replace(/\D/g, ''))
                }
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
                        firstName: "${payload.firstName}",
                        lastName: "${payload.lastName}",
                        CPF: "${payload.cpf}",
                        CNPJ: "${payload.cnpj}",
                        email: "${payload.email}",
                        password: "${payload.password}",
                        repeatPassword: "${payload.repeatPassword}"
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

                  navigate('/home')
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
    </>
  )
}
