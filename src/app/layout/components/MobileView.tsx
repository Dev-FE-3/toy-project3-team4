import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MobileView = () => {
  return (
    <div
      id="view-container"
      className="mx-auto box-content flex min-h-screen w-[430px] flex-col border-x border-gray-light-medium lg:relative lg:left-1/2 lg:mx-0"
    >
      <Header />
      <main className="flex-1 bg-basic-white py-[56px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MobileView
