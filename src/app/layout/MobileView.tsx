import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MobileView = () => {
  return (
    <section id="view-container" className="flex w-[430px] flex-col border">
      <Header />
      <Outlet />
      <Footer />
    </section>
  )
}

export default MobileView
