export interface ILayputSecondaryProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

export default function LayoutSecondary({ children }: ILayputSecondaryProps) {
  return (
    <>
      <div className="h-screen">
        <div className="">{children}</div>
      </div>
    </>
  )
}
