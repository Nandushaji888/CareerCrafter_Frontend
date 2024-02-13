import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminRouter from './router/AdminRouter'
import UserRouter from './router/UserRouter'
import RecruiterRouter from './router/RecruiterRouter'

function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path='/admin/*' element={<AdminRouter />} />
          <Route path='/recruiter/*' element={<RecruiterRouter />} />
          <Route path='/*' element={<UserRouter />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
