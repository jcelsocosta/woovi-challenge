import { Routes, Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Login from './components/login/Login'
import NoMatch from './components/NoMatch'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/about" element={<About></About>} />
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </>
  )
}

export default App
