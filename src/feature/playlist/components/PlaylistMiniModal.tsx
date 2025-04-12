import { motion, AnimatePresence } from 'framer-motion'
import { ListMusic, ChevronUp } from 'lucide-react'
import { IMiniModalProps } from '../types/IPlayList'

const PlaylistMiniModal = ({ videoId, playlist, onOpenFull }: IMiniModalProps) => {
  if (!playlist.length) return null

  const currentIndexInPlaylist = playlist.findIndex((video) => video.id === videoId)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        onClick={onOpenFull}
        className="fixed bottom-[70px] z-40 mx-[10px] flex h-[70px] w-[410px] cursor-pointer items-center gap-[15px] rounded-[10px] bg-[#E2ECF6] px-[15px] py-[10px] shadow-md"
      >
        <ListMusic className="h-5 w-5 text-[#262729]" />
        <div className="flex flex-col justify-center">
          <p className="text-[10px] text-gray-500">다음: playlist</p>
          <p className="max-w-[280px] truncate font-[ABeeZee] text-[14px] leading-[20px] text-[#262729]">
            {playlist[currentIndexInPlaylist + 1].title || '다음 영상 없음'}
          </p>
          <p className="text-[12px] text-gray-500">
            {playlist[currentIndexInPlaylist]?.ownerName} ({currentIndexInPlaylist + 1}/{playlist.length})
          </p>
        </div>
        <div className="ml-auto">
          <ChevronUp className="h-4 w-4 text-[#262729]" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaylistMiniModal
