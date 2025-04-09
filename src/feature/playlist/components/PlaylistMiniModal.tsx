import { usePlaylistStore } from '@/shared/store/playlist/usePlaylistStore'
import { ListMusic, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PlaylistMiniModal = () => {
  const { current, currentIndex, toggleFullModal, isFullOpen } = usePlaylistStore()
  const shouldShow = current && current.videos[currentIndex] && !isFullOpen
  const nextVideo = current?.videos[currentIndex + 1]

  return (
    <AnimatePresence>
      {shouldShow ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onClick={() => toggleFullModal(true)}
          className="fixed bottom-[70px] z-40 mx-[10px] flex h-[70px] w-[410px] cursor-pointer items-center gap-[15px] rounded-[10px] bg-[#E2ECF6] px-[15px] py-[10px] shadow-md"
        >
          {/* 왼쪽 아이콘 */}
          <ListMusic className="h-5 w-5 text-[#262729]" />

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] text-gray-500">다음: playlist_</p>
            <p className="max-w-[280px] truncate font-[ABeeZee] text-[14px] leading-[20px] text-[#262729]">{nextVideo?.title || '다음 영상 없음'}</p>
            <p className="text-[12px] text-gray-500">
              {current?.ownerName} ({currentIndex + 1}/{current?.videos.length})
            </p>
          </div>

          {/* 오른쪽 아이콘 */}
          <div className="ml-auto">
            <ChevronUp className="h-4 w-4 text-[#262729]" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default PlaylistMiniModal
