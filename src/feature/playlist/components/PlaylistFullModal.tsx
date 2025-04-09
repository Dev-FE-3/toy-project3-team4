import { motion, AnimatePresence } from 'framer-motion'
import { usePlaylistStore } from '@/shared/store/playlist/usePlaylistStore'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'
import useYoutubePlayListVideoInfo from '../api/useYoutubePlayListVideoInfo'
import useYoutubePlayListInfo from '../api/useYoutubePlayListInfo'

const PlaylistFullModal = ({ playlistId = 'PLGhOCcpfhWjfoZCf1iNRHFm8U9Xjc9RRQ', myself = false }) => {
  const { current, isFullOpen } = usePlaylistStore()
  const { data: playlist, isLoading: playlistIsLoading, error: playlistError } = useYoutubePlayListVideoInfo(playlistId)
  const { data: playlistInfo, isLoading: playlistInfoIsLoading, error: playlistInfoError } = useYoutubePlayListInfo(playlistId)

  if (playlistIsLoading) return <div>Loading...</div>
  if (playlistError) return <div>Error occurred</div>

  if (playlistInfoIsLoading) return <div>Loading...</div>
  if (playlistInfoError) return <div>Error occurred</div>

  console.log(playlistInfo)

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
          <PlaylistHeader
            playlistTitle={playlistInfo.items[0].snippet.title}
            channelTitle={playlistInfo.items[0].snippet.channelTitle}
            videoCount={playlistInfo.items[0].contentDetails.itemCount}
          />

          {/* 바디 (스크롤 영역)*/}
          <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
            {playlist.items.map((playlistId, idx: number) => (
              <PlaylistVideoItem
                key={idx}
                thumbnailUrl={playlistId.snippet.thumbnails.high.url}
                title={playlistId.snippet.title}
                videoId={playlistId.snippet.resourceId.videoId}
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
