import { useSearchParams } from 'react-router-dom'

const Channel = () => {
  const [searchParams] = useSearchParams()

  // 유저 id를 받으면 될 듯?
  const myChannel = searchParams.get('mychannel') || false

  // 유튜브에서 채널 탐색 하는 API를 가져와야 할 듯 ㅇㅇ
  const channelId = searchParams.get('channel') ?? ''
  return <div>{myChannel ? <>내 채널 페이지 {myChannel}</> : <>다른 사람 채널 페이지 {channelId}</>}</div>
}

export default Channel
