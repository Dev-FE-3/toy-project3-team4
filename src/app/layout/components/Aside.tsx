import { Button } from '@/shared/lib/shadcn/ui/button'

const Aside = () => {
  return (
    <aside className="fixed right-1/2 top-0 -z-10 hidden h-full w-[512px] flex-col lg:flex lg:justify-between">
      <section className="mt-8">
        <img src="/public/image/logo/logo.svg" alt="로고" className="w-24" />
      </section>
      <section className="text-5xl font-bold">
        <p>
          스트리밍 <span className="text-main-primary">1등</span> 플랫폼
        </p>
        <p className="text-main-primary">플레이요!</p>
        <div className="mt-4 flex flex-wrap gap-1">
          <Button className="bg-main-warning text-white hover:bg-red-600"># 신규 콘텐츠 업데이트</Button>
          <Button className="bg-main-primary text-basic-white hover:bg-blue-600"># 인기 급상승</Button>
          <Button className="bg-main-success text-white hover:bg-purple-600"># 오직 플레이요에서</Button>
        </div>
      </section>
      <footer className="mb-8 flex">
        <img src="/public/image/download/google-play-rd.png" className="w-2/6" />
        <img src="/public/image/download/app-store-rd.png" className="w-2/6" />
      </footer>
    </aside>
  )
}

export default Aside
