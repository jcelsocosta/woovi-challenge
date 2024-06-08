export interface IDisplayProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
  title?: string
}

export default function Display({ children, title, className }: IDisplayProps) {
  return (
    <div className={`flex flex-col justify-start ${className}`}>
      <div>
        <h1>{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  )
}
