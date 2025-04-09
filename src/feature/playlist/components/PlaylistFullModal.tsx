import { motion, AnimatePresence } from 'framer-motion'
import { usePlaylistStore } from '@/shared/store/playlist/usePlaylistStore'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'
import useYoutubePlayListVideoInfo from '../api/useYoutubePlayListVideoInfo'

const PlaylistFullModal = ({ videoId = 'JSFG-IE8n_c', playlistId = 'RDJSFG-IE8n_c', myself = false }) => {
  const { current, isFullOpen } = usePlaylistStore()
  const { data: playlist, isLoading, error } = useYoutubePlayListVideoInfo(playlistId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred</div>
  console.log(playlist.items[0])

  return (
    <AnimatePresence>
      {current && isFullOpen && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-[56px] top-[300px] z-50 flex w-[430px] flex-col bg-white shadow-xl"
        >
          {/* 헤더 */}
          <PlaylistHeader />

          {/* 바디 (스크롤 영역)*/}
          <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
            {playlist.items.map((video, idx) => (
              <PlaylistVideoItem
                key={idx}
                thumbnailUrl={video.snippet.thumbnails.high.url}
                title={video.snippet.title}
                videoId={video.snippet.resourceId.videoId}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlaylistFullModal
