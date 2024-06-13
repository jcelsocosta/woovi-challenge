export interface IDefaultProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Default({}: IDefaultProps) {
  return (
    <>
      <div className="ps-40">divAbout page</div>
    </>
  )
}
