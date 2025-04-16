import { EllipsisVertical, ListVideo } from 'lucide-react'
import { useVideoInfo } from '../api/useVideoInfo'
import { Link } from 'react-router-dom'

interface IPlayListIemProps {
  id: number
  name: string
  access: string
  count: number
}

const PlayListItem: React.FC<IPlayListIemProps> = ({ id, name, access, count }) => {
  const { data: video, isLoading: videoLoading, error: videoError } = useVideoInfo(id)

  if (videoLoading || videoError || !video || video.length < 2) return <></>

  const videoThumbnail = video[0]
  const { playlist_id: playListId, video_id: videoId } = video[1]

  return (
    <>
      <section className="relative w-[180px]">
        <Link to={`/watch?video=${videoId}&playlist=${playListId}&myself=true`}>
          <div className="ml-2 mr-2 h-[50px] rounded-[5px] bg-[#E0E0E2]"></div>
          <img className="absolute top-[8px] w-[180px] rounded-[5px]" src={videoThumbnail} />
          <div className="absolute bottom-[20px] right-[9px] flex w-[48px] justify-center gap-[4px] rounded-[20px] bg-gray-900/40 px-[8px] py-[3px] text-white">
            <ListVideo />
            <p>{count}</p>
          </div>
        </Link>
      </section>

      <section className="mt-[5px] flex w-[205px] justify-between gap-[10px]">
        <Link to={`/watch?video=${videoId}&playlist=${playListId}&myself=true`}>
          <div className="flex w-[180px] flex-col gap-[8px]">
            <h3 className="text-[14px] font-semibold">{name}</h3>
            <p className="text-[12px] text-gray-medium-dark">{access === 'true' ? '공개' : '비공개'}</p>
          </div>
        </Link>
        <EllipsisVertical size={15} strokeWidth={2} className="stroke-gray-dark" />
      </section>
    </>
  )
}

export default PlayListItem
