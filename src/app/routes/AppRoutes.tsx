import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '@/feature/home'
import Video from '@/feature/video'
import AppSettings from '@/feature/app-settings'
import Login from '@/feature/login'
import AuthCallback from '@/feature/auth/AuthCallback'
import PlayListView from '@/feature/playlist'
import Channel from '@/feature/channel'
import Search from '@/feature/search'
import Follow from '@/feature/follow'
import PageNotFound from '@/shared/components/error/PageNotFound'
import ROUTES from './constants/routes'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.AUTH_CALLBACK} element={<AuthCallback />} />
          <Route path={ROUTES.WATCH} element={<Video />} />
          <Route path={ROUTES.SETTINGS} element={<AppSettings />} />
          <Route path={ROUTES.PLAYLIST} element={<PlayListView />} />
          <Route path={ROUTES.CHANNEL} element={<Channel />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.FOLLOW} element={<Follow />} />
          <Route path={ROUTES.NOT_FOUND} element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
