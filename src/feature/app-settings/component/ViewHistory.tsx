import { Button } from '@/shared/lib/shadcn/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const ViewHistory = () => {
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
          {['동영상1', '동영상2', '동영상3', '동영상4', '동영상5', '동영상6'].map((item, idx) => (
            <SwiperSlide key={idx} style={{ width: '140px' }}>
              <li className="flex h-[130px] w-[140px] flex-col">
                <img className="h-[86px] rounded-md border-none" src="https://i.ytimg.com/vi/Ht17A6Sb_og/mqdefault.jpg"></img>
                <div className="mt-[5px]">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">아이유의 전성기 노래를 들어</p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-gray-medium-dark">아이유팬1호</p>
                </div>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
    </article>
  )
}

export default ViewHistory
