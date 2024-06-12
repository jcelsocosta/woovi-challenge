import { useNavigate } from 'react-router-dom'

export interface IDefaultProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Default({}: IDefaultProps) {
  const navigate = useNavigate()
  return (
    <>
      <div className="ps-40">divAbout page</div>
    </>
  )
}
