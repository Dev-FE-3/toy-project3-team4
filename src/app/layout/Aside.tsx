import { Badge } from '@/shared/lib/shadcn/ui/badge'
import { Button } from '@/shared/lib/shadcn/ui/button'

const Aside = () => {
  return (
    <aside className="w-[512px] flex flex-col h-screen">
      <section className="mt-8">
        <img src="/public/image/logo/logo.png" alt="로고" className="w-24" />
      </section>
      <section className="mt-80 text-5xl font-bold">
        <p>
          스트리밍 <span className="text-main-primary">1등</span> 플랫폼
        </p>
        <p className="text-main-primary">플레이요!</p>
        <div className="mt-4 flex flex-wrap gap-1">
          <Button className="bg-main-warning hover:bg-red-600 text-white"># 신규 콘텐츠 업데이트</Button>
          <Button className="bg-main-primary hover:bg-blue-600 text-basic-white"># 인기 급상승</Button>
          <Button className="bg-main-success hover:bg-purple-600 text-white"># 오직 플레이요에서</Button>
          <Badge className="bg-main-warning hover:bg-red-600 text-white"># 신규 콘텐츠 업데이트</Badge>
          <Badge className="bg-main-primary hover:bg-blue-600 text-basic-white"># 인기 급상승</Badge>
          <Badge className="bg-main-success hover:bg-purple-600 text-white"># 오직 플레이요에서</Badge>
        </div>
      </section>
      <footer className="flex mt-auto">
        <img src="/public/image/download/google-play-rd.png" className="w-2/6" />
        <img src="/public/image/download/app-store-rd.png" className="w-2/6" />
      </footer>
    </aside>
  )
}

export default Aside
