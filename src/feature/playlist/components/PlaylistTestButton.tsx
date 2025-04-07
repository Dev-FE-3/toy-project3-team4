import { usePlaylistStore } from '../stores/usePlaylistStore.ts'
import { PlaylistMock } from '../mock/playlistMock'

const PlaylistTestPage = () => {
  const open = () => {
    usePlaylistStore.getState().openPlaylist(PlaylistMock)
  }

  return (
    <button onClick={open} className="rounded bg-blue-500 px-4 py-2 text-white">
      플레이리스트 테스트 열기
    </button>
  )
}

export default PlaylistTestPage
