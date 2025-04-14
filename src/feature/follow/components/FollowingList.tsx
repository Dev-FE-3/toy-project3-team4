import { memo } from 'react'
import { FollowingChannel } from '../type/IFollowingTypes'
import FollowingThumbnail from './FollowingThumbnail'
import { Link } from 'react-router-dom'

const LIMIT = 6

const FollowingList = memo(({ channels }: { channels: FollowingChannel[] }) => {
  const displayData = channels.slice(0, LIMIT)
  const hasMore = channels.length > LIMIT

  return (
    <ul className="flex flex-wrap gap-[13px] p-[15px]">
      {displayData.map((item: FollowingChannel) => (
        <Link to={`/channel/${item.channel}`} key={item.channel}>
          <FollowingThumbnail channelId={item.channel} />
        </Link>
      ))}
      {hasMore && (
        <Link to="#">
          <li className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-gray-light-medium bg-gray-light text-sm text-gray-medium-dark hover:text-gray-dark">
            더보기
          </li>
        </Link>
      )}
    </ul>
  )
})

export default FollowingList
