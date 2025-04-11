import { motion, AnimatePresence } from 'framer-motion'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItemContainer from './PlaylistVideoItemContainer'
import useYoutubePlayListInfo from '../api/useYoutubePlayListInfo'
import { IPlaylistProps } from '../types/IPlayList'

const PlaylistFullModal = ({ playlistId, myself, playlist, currentIndex, setCurrentIndex, setIsFullOpen }: IPlaylistProps) => {
  const { data: playlistInfo } = useYoutubePlayListInfo(playlistId)

  if (!playlistInfo) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-[56px] top-[300px] z-50 flex w-[430px] flex-col bg-white shadow-xl"
      >
        <PlaylistHeader
          playlistTitle={playlistInfo.items[0].snippet.title}
          channelTitle={playlistInfo.items[0].snippet.channelTitle}
          videoCount={playlist.length}
          currentIndex={currentIndex}
          onClose={() => setIsFullOpen(false)}
          myself={myself}
          isPublic={true}
        />

        <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
          {playlist.map((video, idx) => (
            <PlaylistVideoItemContainer
              key={video.id}
              index={idx}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
              videoId={video.id}
              onClick={() => setCurrentIndex(idx)}
              isActive={idx === currentIndex}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaylistFullModal
