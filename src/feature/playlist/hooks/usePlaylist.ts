// hooks/usePlaylist.ts
import { useQuery } from '@tanstack/react-query'
import { fetchPlaylistById } from '../services/fetchPlaylist'

export const usePlaylist = (playlistId: string) => {
  return useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => fetchPlaylistById(playlistId),
  })
}
