import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { ArrowLeft, CircleUser, LogOut } from 'lucide-react'
import { useContext } from 'react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import AuthContext from '../../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export interface INavigationTopProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function NavigationTop({ className }: INavigationTopProps) {
  const navigate = useNavigate()
  return (
    <div className={`bg-woovi h-12 text-white ${className}`}>
      <div className="flex flex-row justify-between items-center h-full mx-4">
        <div className="inline-flex gap-x-2 items-center cursor-pointer">{/*<ArrowLeft />*/}</div>
        <div className="inline-flex gap-x-2 items-center cursor-pointer me-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:border-none border-black">
              <CircleUser height={35} width={35} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 z-20 text-black shadow-lg mt-2 ">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(evt) => {
                  evt.preventDefault()
                  console.log('LLL')
                  localStorage.removeItem('token')
                  navigate('/')
                }}
              >
                <LogOut />
                <span>Sair da conta</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
