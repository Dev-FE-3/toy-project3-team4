import Aside from './Aside'
import MobileView from './MobileView'

function Layout() {
  return (
    <main className="flex justify-center gap-10">
      <Aside />
      <MobileView />
    </main>
  )
}

export default Layout
