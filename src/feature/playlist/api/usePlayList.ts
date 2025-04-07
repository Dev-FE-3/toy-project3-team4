import axios from 'axios'
import { Playlist } from '../type/playlist'

export const getPlaylist = async (playlistId: string): Promise<Playlist> => {
  const res = await axios.get(`/api/playlists/${playlistId}`)
  return res.data
}

export const togglePlaylistVisibility = async (playlistId: string): Promise<void> => {
  await axios.patch(`/api/playlists/${playlistId}/visibility`)
}
