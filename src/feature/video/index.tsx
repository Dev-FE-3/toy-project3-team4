import { useYoutubePopularVideo, useYoutubeSearch, useYoutubeVideoInfo } from '@/shared/util/youtube'
import { useParams } from 'react-router-dom'
import DetailedVideo from './components/DetailedVideo'
import CommentContainer from './components/CommentContainer'

const Video: React.FC = () => {
  const id = useParams<string>().id ?? ''

  const { data: video, isLoading: isVideoLoading, error: videoError } = useYoutubeVideoInfo(id)
  console.log(video)
  if (isVideoLoading) return <p>Loading...</p>
  if (videoError instanceof Error) return <p>{videoError.message}</p>

  return (
    <main className="h-dvh w-full">
      <DetailedVideo id={id} />
      <CommentContainer />
    </main>
  )
}
export default Video
