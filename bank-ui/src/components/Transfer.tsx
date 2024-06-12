import NavigationLeft from './navigationLeft/navigationLeft'
import NavigationTop from './navigationTop/navigationTop'

export interface ITransferProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Transfer({}: ITransferProps) {
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
