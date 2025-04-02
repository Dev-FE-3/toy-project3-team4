import { Outlet } from 'react-router'

function Layout() {
  return (
    <main className="flex justify-center gap-10">
      <aside className="w-[512px] flex flex-col h-screen">
        <section className="mt-8">
          <img src="/public/image/logo/logo.png" alt="로고" className="w-24" />
        </section>
        <section className="mt-80 text-5xl font-bold">
          <p>
            스트리밍 <span className="text-main-primary">1등</span> 플랫폼
          </p>
          <p className="text-main-primary">플레이요!</p>
        </section>
        <footer className="flex mt-auto">
          <img src="/public/image/download/google-play-rd.png" className="w-2/6" />
          <img src="/public/image/download/app-store-rd.png" className="w-2/6" />
        </footer>
      </aside>
      <section className="w-[372px] border">
        <Outlet />
      </section>
    </main>
  )
}

export default Layout
