import { BadgeDollarSign, HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export interface INavigationLeftProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function NavigationLeft({}: INavigationLeftProps) {
  const navigate = useNavigate()
  return (
    <div className="bg-wooviSecondary text-white h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <a href="/home">
          <h1 className="text-4xl">Bank</h1>
        </a>
      </div>

      <div className="flex flex-col mt-10 px-2 gap-y-4 text-lg items-start justify-start">
        <span
          className="inline-flex gap-x-2 items-center cursor-pointer"
          onClick={(evt) => {
            evt.preventDefault()
            navigate('/home')
          }}
        >
          <HomeIcon /> Home
        </span>
        <span
          className="inline-flex gap-x-2 items-center cursor-pointer"
          onClick={(evt) => {
            evt.preventDefault()
            navigate('/transfer')
          }}
        >
          <BadgeDollarSign /> Transferência
        </span>
      </div>
    </div>
  )
}
