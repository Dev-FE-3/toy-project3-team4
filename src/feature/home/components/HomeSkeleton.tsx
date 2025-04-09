const HomeSkeleton = () => {
  return (
    <li className="mb-5 w-full animate-pulse">
      {/* 썸네일 스켈레톤 */}
      <div className="aspect-video w-full rounded-lg bg-gray-200" />

      <div className="mt-3 flex items-start gap-3">
        {/* 채널 아바타 스켈레톤 */}
        <div className="h-9 w-9 rounded-full bg-gray-200" />

        {/* 비디오 정보 스켈레톤 */}
        <div className="flex-1">
          {/* 제목 스켈레톤 */}
          <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
          {/* 조회수, 업로드 날짜 스켈레톤 */}
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>

        {/* 북마크 버튼 스켈레톤 */}
        <div className="h-5 w-5 rounded bg-gray-200" />
      </div>
    </li>
  )
}

export default HomeSkeleton
