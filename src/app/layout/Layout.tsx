import { Outlet } from 'react-router'
import Aside from './Aside'

function Layout() {
  return (
    <main className="flex justify-center gap-10">
      <Aside />
      <section className="w-[372px] border">
        <Outlet />
      </section>
    </main>
  )
}

export default Layout
