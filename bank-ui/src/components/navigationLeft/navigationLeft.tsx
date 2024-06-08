import { BadgeDollarSign, HomeIcon } from 'lucide-react'

export interface INavigationLeftProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function NavigationLeft({}: INavigationLeftProps) {
  return (
    <div className="bg-wooviSecondary text-white h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center">
        <a href="/">
          <h1 className="text-4xl">Bank</h1>
        </a>
      </div>

      <div className="flex flex-col mt-10 px-2 gap-y-4 text-lg items-start justify-start">
        <span className="inline-flex gap-x-2 items-center cursor-pointer">
          <HomeIcon /> Home
        </span>
        <span className="inline-flex gap-x-2 items-center cursor-pointer">
          <BadgeDollarSign /> Transferência
        </span>
      </div>
    </div>
  )
}
