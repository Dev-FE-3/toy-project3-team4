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
import { useAddVideoToPlaylist } from './api/useAddVideoToPlayList'
import { IPlayListItem } from './type/IPlayListItem'
import { useDeleteVideoToPlayList } from './api/useDeleteVideoToPlayList'
import { useQueryClient } from '@tanstack/react-query'

const PlayListModal = ({ closeModal, setModalStates, videoId }: IPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const userId = useAuthStore((store) => store.user?.id) || 21
  const { mutate: addVideoToPlaylist } = useAddVideoToPlaylist()
  const { mutate: deleteVideoToPlayList } = useDeleteVideoToPlayList()
  const queryClient = useQueryClient()

  const { data: playList, isLoading, error } = useFindPlayList(userId)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  if (isLoading) return ''
  if (error) return <div>Error occurred</div>

  const addToPlayList = (playListId: number) => {
    addVideoToPlaylist(
      { playlistId: playListId, videoId: videoId },
      {
        onSuccess: () => {
          alert('플레이리스트에 추가됐어요!')
          queryClient.invalidateQueries({ queryKey: ['find-playList', userId] })
        },
        onError: () => {
          alert('추가에 실패했어요. 다시 시도해보세요.')
        },
      },
    )
  }

  const removeToPlayList = (playListId: number) => {
    deleteVideoToPlayList(
      { playlistId: playListId, videoId: videoId },
      {
        onSuccess: () => {
          alert('삭제 완료!')
          queryClient.invalidateQueries({ queryKey: ['find-playList', userId] })
        },
        onError: () => alert('삭제 실패 ㅠㅠ'),
      },
    )
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
            {playList.map((item: IPlayListItem, index: number) => {
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
                        <span className="mt-1 text-xs text-gray-medium-dark">{item.access === 'Y' ? '공개' : '비공개'}</span>
                      </div>
                    </div>
                    {item.videolist.find((element) => element.video_id === videoId) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 20 21"
                        fill="none"
                        onClick={() => removeToPlayList(item.id)}
                        className="cursor-pointer"
                      >
                        <path
                          d="M15.8333 18L9.99996 14.6667L4.16663 18V4.66667C4.16663 4.22464 4.34222 3.80072 4.65478 3.48816C4.96734 3.17559 5.39127 3 5.83329 3H14.1666C14.6087 3 15.0326 3.17559 15.3451 3.48816C15.6577 3.80072 15.8333 4.22464 15.8333 4.66667V18Z"
                          fill="#525252"
                          stroke="#525252"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 8.83317L9.16667 10.4998L12.5 7.1665"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <BookmarkPlus onClick={() => addToPlayList(item.id)} size={24} className="cursor-pointer stroke-gray-dark" />
                    )}
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
