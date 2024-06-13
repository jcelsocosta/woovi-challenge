import { Routes, Route } from 'react-router-dom'
import History from './components/History'
import Home from './components/Home'
import Login from './components/login/Login'
import NoMatch from './components/NoMatch'
import SignUp from './components/signUp/SignUp'
import Transfer from './components/Transfer'
import { AuthProvider } from '../context/auth/AuthContext'
import Default from './components/Default'

function App() {
  return (
    <>
      <Routes>
        <AuthProvider>
          <Route path="/" element={<Default></Default>} />
          <Route path="/transfer" element={<Transfer></Transfer>}></Route>
          <Route path="/home" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />

          <Route path="/history" element={<History></History>} />
          <Route path="*" element={<NoMatch></NoMatch>}></Route>
        </AuthProvider>

        <Route path="/signup" element={<SignUp></SignUp>} />
      </Routes>
    </>
  )
}

export default App
