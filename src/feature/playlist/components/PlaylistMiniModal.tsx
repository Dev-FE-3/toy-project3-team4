import { usePlaylistStore } from '../stores/usePlaylistStore.ts'

const PlaylistMiniModal = () => {
  const { current, currentIndex, toggleFullModal } = usePlaylistStore()
  if (!current || !current.videos[currentIndex]) return null

  const nextVideo = current.videos[currentIndex + 1]

  return (
    <div
      onClick={() => toggleFullModal(true)}
      className="fixed bottom-0 left-0 right-0 z-40 flex cursor-pointer items-center justify-between border-t bg-white px-4 py-3 shadow-inner"
    >
      <div>
        <p className="text-xs text-gray-400">다음</p>
        <p className="w-64 truncate text-sm font-semibold">{nextVideo?.title || '다음 영상 없음'}</p>
      </div>
      <div className="text-xs text-gray-500">
        {currentIndex + 1}/{current.videos.length}
      </div>
    </div>
  )
}

export default PlaylistMiniModal
