import { Button } from '@/shared/lib/shadcn/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import useViewHistory from '../api/useViewHistory'
import useYoutubeLinkInfo from '../api/useYoutubeLinkInfo'

const ViewHistory = () => {
  const { data: view, isLoading, error } = useViewHistory()
  const youtubeLinks = useYoutubeLinkInfo(view)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  return (
    <article className="md-[15px] mt-[15px]">
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">시청기록</p>
        <Button className="h-[32px] w-[62px] border border-solid border-gray-light-medium bg-basic-white text-[12px] text-gray-dark shadow-none hover:bg-basic-white hover:text-gray-dark">
          모두보기
        </Button>
      </div>

      <ul className="mb-[15px] mt-[15px]">
        <Swiper spaceBetween={15} slidesPerView={'auto'}>
          {youtubeLinks.map((item, idx) => {
            if (item.isLoading || item.isError || !item.data) return null
            const data = item.data.items[0]
            const { id, kind, snippet, contentDetails } = data
            const { title, channelTitle } = snippet
            const itemCount = contentDetails?.itemCount

            const isPlaylist = kind === 'youtube#playlist'
            const thumbnailUrl = isPlaylist
              ? snippet?.thumbnails?.high?.url // YouTube API가 제공하는 플레이리스트 썸네일
              : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

            return (
              <SwiperSlide key={idx} style={{ width: '140px' }}>
                <li className="flex flex-col">
                  <img className="h-[86px] max-h-[86px] min-h-[86px] w-full rounded-md border-none object-cover" src={thumbnailUrl} />
                  <div className="mt-[5px]">
                    <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</h4>
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-gray-medium-dark">{channelTitle}</p>
                  </div>
                </li>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </ul>
    </article>
  )
}

export default ViewHistory
