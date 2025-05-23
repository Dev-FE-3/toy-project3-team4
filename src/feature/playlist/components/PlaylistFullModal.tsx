import { motion, AnimatePresence } from 'framer-motion'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'
import { Link } from 'react-router-dom'
import { IPlaylistFullModalProps } from '../types/IPlayList'

const PlaylistFullModal = ({ playList, playListInfo, myself, setIsFullOpen }: IPlaylistFullModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-[56px] top-[300px] z-50 flex w-[430px] flex-col bg-basic-white shadow-xl"
      >
        <PlaylistHeader
          playlistTitle={playListInfo.title}
          channelTitle={playListInfo.channelTitle}
          onClose={() => setIsFullOpen(false)}
          myself={myself}
          isPublic={true}
        />

        <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
          {playList.map((video, index) =>
            video.title === 'Deleted video' ? (
              <PlaylistVideoItem key={video.id} videoId={video.id} title={video.title} thumbnailUrl={video.thumbnailUrl} />
            ) : (
              <Link to={`/watch?video=${video.id}&playlist=${playListInfo.id}${myself ? '&myself=true' : ''}`} key={index}>
                <PlaylistVideoItem key={video.id} videoId={video.id} title={video.title} thumbnailUrl={video.thumbnailUrl} />
              </Link>
            ),
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaylistFullModal
