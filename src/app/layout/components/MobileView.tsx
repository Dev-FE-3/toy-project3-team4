import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MobileView = () => {
  const location = useLocation()
  const hideLayoutPaths = ['/login'] // Header, Footer를 숨길 경로

  return (
    <div
      id="view-container"
      className="mx-auto box-content flex min-h-screen w-[430px] flex-col border-x border-gray-light-medium lg:relative lg:left-1/2 lg:mx-0"
    >
      {!hideLayoutPaths.includes(location.pathname) && <Header />}
      <main className={`flex-1 bg-basic-white ${hideLayoutPaths.includes(location.pathname) ? '' : 'py-[56px]'}`}>
        <Outlet />
      </main>
      {!hideLayoutPaths.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default MobileView
