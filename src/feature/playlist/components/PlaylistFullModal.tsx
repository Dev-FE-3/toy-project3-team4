import { motion, AnimatePresence } from 'framer-motion'
import PlaylistHeader from './PlaylistHeader'
import PlaylistVideoItem from './PlayListVideoItem'
import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

//추후 수정할 가능성 있어서 Type폴더로 빼지 않음
export interface IPlaylistFullModalProps {
  playlistInfo: {
    items: {
      id: string
      snippet: {
        title: string
        channelTitle: string
      }
    }[]
  }
  myself: boolean
  playlist: {
    id: string
    title: string
    thumbnailUrl: string
  }[]
  setIsFullOpen: Dispatch<SetStateAction<boolean>>
}

const PlaylistFullModal = ({ playlistInfo, myself, playlist, setIsFullOpen }: IPlaylistFullModalProps) => {
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
          onClose={() => setIsFullOpen(false)}
          myself={myself}
          isPublic={true}
        />

        <div className="scrollbar-hide flex-1 overflow-y-auto px-[2px]">
          {playlist.map((video, index) => {
            return (
              // Link to supabase || youtube 구분해줘야함 myself 넣어서
              <Link to={`/watch?video=${video.id}&playlist=${playlistInfo.items[0].id}`} key={index}>
                <PlaylistVideoItem key={video.id} title={video.title} videoId={video.id} thumbnailUrl={video.thumbnailUrl} />
              </Link>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PlaylistFullModal
