import { Routes, Route } from 'react-router-dom'
import Default from './components/Default'
import History from './components/History'
import Home from './components/Home'
import Login from './components/login/Login'
import NoMatch from './components/NoMatch'
import SignUp from './components/signUp/SignUp'
import Transfer from './components/Transfer'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Default></Default>} />
        <Route path="/transfer" element={<Transfer></Transfer>}></Route>
        <Route path="/home" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/signup" element={<SignUp></SignUp>} />
        <Route path="/history" element={<History></History>} />
        <Route path="*" element={<NoMatch></NoMatch>}></Route>
      </Routes>
    </>
  )
}

export default App
