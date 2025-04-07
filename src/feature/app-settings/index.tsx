import UserChannel from '@/shared/components/UserChannel'
import Settings from './components/Settings'
import ViewHistory from './components/ViewHistory'

const AppSettings = () => {
  return (
    <section className="ml-[15px] mr-[15px]">
      {/* 내 채널 정보 */}
      <UserChannel myself={true} />
      {/* 시청기록 */}
      <ViewHistory />
      {/* 설정 */}
      <Settings />
    </section>
  )
}

export default AppSettings
