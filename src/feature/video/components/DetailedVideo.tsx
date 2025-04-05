import { useState } from 'react'
import { IDetailedVideoProps } from '../type/IVideo'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Bookmark, Heart, Share2, UserPlus } from 'lucide-react'

const DetailedVideo: React.FC<IDetailedVideoProps> = ({ id }) => {
  const [viewCount, setViewCount] = useState<number>(100)
  const [publishedAt, setPublishedAt] = useState<string>('12일전')
  const [likeCount, setLickCount] = useState<number>(1000)

  return (
    <article className="aspect-video w-full">
      <section>
        <iframe
          height="240"
          className="w-full border-0"
          src={`https://www.youtube.com/embed/${id}`}
          title="조째즈 (ZO ZAZZ) - 서쪽하늘 [불후의 명곡2 전설을 노래하다/Immortal Songs 2] | KBS 250322 방송"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>

      <header className="px-[15px] pt-[15px] font-bold">
        조째즈 (ZO ZAZZ) - 서쪽하늘 [불후의 명곡2 전설을 노래하다/Immortal Songs 2] | KBS 250322 방송
      </header>

      <p className="px-[15px] pb-[8px] pt-[8px] text-xs">
        <span>조회수 {viewCount}회 • </span>
        <span>{publishedAt}</span>
      </p>

      <section className="flex items-center justify-between px-[15px]">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage className="rounded-full border border-gray-medium object-cover" src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <div>Beginagain 비긴어게인</div>
        </div>

        <Button className="h-[30px] w-[77px] rounded-full bg-main-primary px-9 py-1 text-sm font-normal">
          <UserPlus />
          팔로우
        </Button>
      </section>

      <section className="flex gap-[10px] px-[15px] py-[8px]">
        <Button className="h-[30px] w-[74px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Heart />
          {likeCount}+
        </Button>
        <Button className="h-[30px] w-[62px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Share2 fill="#525252" />
          공유
        </Button>
        <Button className="h-[30px] w-[62px] rounded-full bg-gray-light px-[9px] py-[7px] text-xs text-gray-dark">
          <Bookmark />
          저장
        </Button>
      </section>
    </article>
  )
}

export default DetailedVideo
