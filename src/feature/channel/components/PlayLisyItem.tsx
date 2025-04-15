import { EllipsisVertical, ListVideo } from 'lucide-react'

import { useVideoInfo } from '../api/useVideoInfo'
import { Link } from 'react-router-dom'

interface IPlayListIemProps {
  id: number
  name: string
  access: string
  created_at: string
  count: number
}

const PlayListItem: React.FC<IPlayListIemProps> = ({ id, name, access, created_at, count }) => {
  const { data: video, isLoading: videoLoading, error: videoError } = useVideoInfo(id)

  if (videoLoading || videoError) return <></>

  const videoThumbnail = video[0]
  const playListId = video[1].playlist_id
  const videoId = video[1].video_id

  return (
    <li key={id} className="flex h-[120px] justify-between gap-[15px]">
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
          <h3 className="flex w-[180px] flex-col gap-[8px]">
            <h3 className="text-[14px] font-semibold">{name}</h3>
            <h3 className="text-[12px] text-gray-medium-dark">{access === 'true' ? '공개' : '비공개'}</h3>
          </h3>
        </Link>
        <EllipsisVertical size={15} strokeWidth={2} className="stroke-gray-dark" />
      </section>
    </li>
  )
}

export default PlayListItem
