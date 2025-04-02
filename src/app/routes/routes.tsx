import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '@/feature/home/Home'
import Design from '@/feature/design/Design'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/design-guide" element={<Design />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
