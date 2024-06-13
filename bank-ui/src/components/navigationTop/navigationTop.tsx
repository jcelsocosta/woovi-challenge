import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { CircleUser, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
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
