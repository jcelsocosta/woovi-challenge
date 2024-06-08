import { ArrowLeft, CircleUser } from 'lucide-react'

export interface INavigationTopProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function NavigationTop({ className }: INavigationTopProps) {
  return (
    <div className={`bg-woovi h-12 text-white ${className}`}>
      <div className="flex flex-row justify-between items-center h-full mx-4">
        <div className="inline-flex gap-x-2 items-center cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="inline-flex gap-x-2 items-center cursor-pointer me-5">
          <CircleUser height={35} width={35} />
        </div>
      </div>
    </div>
  )
}
