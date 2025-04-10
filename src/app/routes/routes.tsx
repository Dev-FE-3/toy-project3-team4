import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '@/feature/home'
import Design from '@/feature/design/Design'
import Video from '@/feature/video'
import AppSettings from '@/feature/app-settings'
import Login from '@/feature/login'
import AuthCallback from '@/feature/auth/AuthCallback'
import PlayListView from '@/feature/playlist'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/design-guide" element={<Design />} />
          <Route path="/watch" element={<Video />} />
          <Route path="/settings" element={<AppSettings />} />
          <Route path="/playlist" element={<PlayListView />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
