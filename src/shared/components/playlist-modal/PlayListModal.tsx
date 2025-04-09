import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Plus, X, BookmarkPlus } from 'lucide-react'
import IPlayListModalProps from './type/IPlayListModalProps'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { useFindPlayList } from './api/useFindPlayList'
import { motion } from 'framer-motion'

const PlayListModal = ({ closeModal, setModalStates, videoId = 'TEST' }: IPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const userId = useAuthStore((store) => store.user?.id) || 21

  const { data: playList, isLoading, error } = useFindPlayList(userId)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>

  const addToPlayList = (playListId: number) => {
    console.log(videoId)
    console.log(playListId)
  }

  const addNewPlayList = () => {
    setModalStates()
  }

  if (!container) return null

  const modalContent = (
    <motion.div
      className="absolute inset-0 z-50 mb-4 flex items-end justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
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
            {playList.map((item, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex gap-4">
                      <img
                        className="size-16 rounded-lg"
                        src={`https://img.youtube.com/vi/${item.videolist[0].video_id}/maxresdefault.jpg`}
                        alt="재생목록 사진"
                      />
                      <div className="flex w-[250px] flex-col justify-center">
                        <p className="text-sm font-bold">{item.name}</p>
                        <span className="mt-1 text-xs text-gray-medium-dark">{item.access ? '공개' : '비공개'}</span>
                      </div>
                    </div>
                    <BookmarkPlus onClick={() => addToPlayList(item.id)} size={24} className="cursor-pointer stroke-gray-dark" />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </motion.div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default PlayListModal
