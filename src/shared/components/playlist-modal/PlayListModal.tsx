import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Plus, X, BookmarkPlus } from 'lucide-react'
import IPlayListModalProps from './type/IPlayListModalProps'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'

const PlayListModal = ({ closeModal, setModalStates }: IPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  const addToPlayList = () => {
    //해당 재생목록에 내 동영상 ID insert, supabase
  }

  const addNewPlayList = () => {
    setModalStates()
  }

  if (!container) return null

  const modalContent = (
    <div className="absolute bottom-[10px] left-1/2 z-50 -translate-x-1/2">
      <div className="max-h-[340px] w-[410px] rounded-md border bg-basic-white px-[15px] pb-[5px] pt-[15px] shadow-lg">
        <h4 className="flex items-center justify-between">
          <Button
            className="h-[32px] border border-gray-light-medium bg-basic-white px-[10px] py-[8px] text-sm text-gray-dark shadow-none"
            onClick={addNewPlayList}
          >
            <Plus />새 플레이리스트
          </Button>
          <X onClick={closeModal} className="cursor-pointer text-gray-medium-dark" />
        </h4>

        {/* ✅ Swiper를 활용한 스크롤 영역 */}
        <div className="mt-4 flex max-h-[250px] flex-col overflow-hidden rounded">
          <Swiper
            direction="vertical"
            slidesPerView="auto"
            spaceBetween={2}
            freeMode={true}
            mousewheel={true}
            modules={[FreeMode, Mousewheel]}
            className="min-h-0 w-full flex-1"
          >
            {[...Array(3)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex gap-4">
                    <img className="size-14 rounded-lg" src="/public/image/logo/main-logo.png" alt="재생목록 사진" />
                    <div>
                      <p className="font-bold">권진아 노래모음 {index + 1}</p>
                      <span className="text-sm text-gray-medium-dark">비공개</span>
                    </div>
                  </div>
                  <BookmarkPlus onClick={addToPlayList} size={24} className="cursor-pointer stroke-gray-dark" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default PlayListModal
