import useYoutubeVideoInfo from '../api/useYoutubeVideoInfo'
import PlaylistVideoItem from './PlayListVideoItem'
import { TVideoItemContainerProps } from '../types/IPlayList'

const PlaylistVideoItemContainer = (props: TVideoItemContainerProps) => {
  const { videoId } = props
  const { data: videoData } = useYoutubeVideoInfo(videoId)

  const views = videoData?.items[0]?.statistics?.viewCount ?? null
  const createdAt = videoData?.items[0]?.snippet?.publishedAt ?? null

  return <PlaylistVideoItem {...props} views={views} createdAt={createdAt} />
}

export default PlaylistVideoItemContainer
