import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useContext, useState } from 'react'
import AuthContext from '../../../context/auth/AuthContext'

export interface ILoginProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Login({}: ILoginProps) {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const form = useForm()
  return (
    <>
      <div className="bg-wooviSecondary bg-opacity-60 h-12">
        <a href="/">
          <h1 className="text-4xl text-white ps-10">Bank</h1>
        </a>
      </div>
      <div className="flex flex-row justify-center md:justify-normal mt-10 gap-x-10 w-full md:px-10 md:pt-10">
        <div className="hidden md:block w-[50rem] h-[30rem]">
          <img className="h-full w-full" src="./photo2.jpg"></img>
        </div>

        <div className="flex items-center justify-center md:justify-normal w-[30rem] md:h-[30rem]">
          <div className="flex flex-col w-full h-full shadow-2xl rounded-lg p-4 text-center">
            <div>
              <span className="font-semibold text-2xl text-wooviSecondary">Login</span>
            </div>
            <FormProvider {...form}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormControl>
                      <Input
                        className="pt-6 pb-6"
                        placeholder="email"
                        {...field}
                        onChange={(evt) => {
                          evt.preventDefault()
                          setEmail(() => evt.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormControl>
                      <Input
                        type={'password'}
                        className="pt-6 pb-6"
                        placeholder="********"
                        {...field}
                        onChange={(evt) => {
                          evt.preventDefault()
                          setPassword(() => evt.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signup"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormControl>
                      <Button
                        className="bg-woovi pb-6 pt-6 hover:bg-woovi hover:opacity-60 w-full"
                        {...field}
                        onClick={async (evt) => {
                          evt.preventDefault()

                          await login(email, password)
                        }}
                      >
                        Entrar{' '}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormControl>
                      <a
                        type="button"
                        className="text-wooviSecondary pb-6 pt-6 cursor-pointer hover:underline w-full"
                        {...field}
                        onClick={(evt) => {
                          evt.preventDefault()
                          window.location.href = '/signup'
                        }}
                      >
                        Fazer Cadastro{' '}
                      </a>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  )
}
