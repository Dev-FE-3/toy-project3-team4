import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '@/feature/home'
import Design from '@/feature/design/Design'
import AppSettings from '@/feature/app-settings'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/design-guide" element={<Design />} />
          <Route path="/settings" element={<AppSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
