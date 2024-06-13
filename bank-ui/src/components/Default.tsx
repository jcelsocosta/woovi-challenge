import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IDefaultProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function Default({}: IDefaultProps) {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate('/home')
    } else {
      navigate('login')
    }
  }, [])
  return (
    <>
      <div></div>
    </>
  )
}
