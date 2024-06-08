import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

export interface IAboutProps extends React.ComponentPropsWithoutRef<'div'> {}

export default function About({}: IAboutProps) {
  const navigate = useNavigate()
  return (
    <>
      <div className="ps-40">divAbout page</div>
      <div>
        <Button
          type="button"
          onClick={(evt) => {
            evt.preventDefault()
            navigate('/')
          }}
        >
          Voltar
        </Button>
      </div>
    </>
  )
}
