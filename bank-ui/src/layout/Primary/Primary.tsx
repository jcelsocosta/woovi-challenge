import NavigationLeft from '@/components/navigationLeft/navigationLeft'
import NavigationTop from '@/components/navigationTop/navigationTop'

export interface ILayputPrimaryProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function LayoutPrimary({}: ILayputPrimaryProps) {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-40">
          <NavigationLeft />
        </div>

        <div className="w-full">
          <NavigationTop />
        </div>
      </div>
    </>
  )
}
