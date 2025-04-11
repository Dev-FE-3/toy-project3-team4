import { motion, AnimatePresence } from 'framer-motion'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'
import useYoutubeVideoInfo from '../api/useYoutubeVideoInfo'
import { IPlaylistProps } from '../types/IPlayList'

const PlaylistFullModal = ({ playlistInfo, myself, playlist, currentIndex, setCurrentIndex, setIsFullOpen }) => {
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
          {playlist.map((video, idx) => {
            const { data: videoData } = useYoutubeVideoInfo(video.id)
            const views = videoData?.items[0]?.statistics?.viewCount ?? null
            const createdAt = videoData?.items[0]?.snippet?.publishedAt ?? null

            return (
              <PlaylistVideoItem
                key={video.id}
                index={idx}
                thumbnailUrl={video.thumbnailUrl}
                title={video.title}
                videoId={video.id}
                onClick={() => setCurrentIndex(idx)}
                isActive={idx === currentIndex}
                views={views}
                createdAt={createdAt}
              />
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaylistFullModal
