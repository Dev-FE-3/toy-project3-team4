import { Outlet } from 'react-router-dom'

const MobileView = () => {
  return (
    <section id="view-container" className="w-[372px] border">
      <Outlet />
    </section>
  )
}

export default MobileView
