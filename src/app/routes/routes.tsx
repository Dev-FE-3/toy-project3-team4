import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>{/* <Route path="/" element={< />} /> */}</Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
