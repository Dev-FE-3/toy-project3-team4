import { IVideoItem } from '../types/IPlayList'

const PlaylistPlayer = ({ video }: { video: IVideoItem }) => {
  if (!video) return null

  return (
    <div className="relative aspect-video w-full">
      <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}?autoplay=1`} allowFullScreen title={video.title} />
    </div>
  )
}

export default PlaylistPlayer
