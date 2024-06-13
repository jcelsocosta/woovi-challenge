export interface INoMatchProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function NoMatch({}: INoMatchProps) {
  return (
    <>
      <div>Error</div>
    </>
  )
}
