import { Routes, Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Login from './components/login/Login'
import NoMatch from './components/NoMatch'
import SignUp from './components/signUp/SignUp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/about" element={<About></About>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </>
  )
}

export default App
