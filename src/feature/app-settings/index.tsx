import Settings from './component/Settings'
import ViewHistory from './component/ViewHistory'

const AppSettings = () => {
  return (
    <section className="ml-[15px] mr-[15px]">
      {/* 내 채널 정보 */}
      <div className="h-[130px] bg-blue-400"></div>
      {/* 시청기록 */}
      <ViewHistory />
      {/* 설정 */}
      <Settings />
    </section>
  )
}

export default AppSettings
