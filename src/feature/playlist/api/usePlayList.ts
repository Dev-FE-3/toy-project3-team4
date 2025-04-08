import axios from 'axios'
import { IPlayList } from '../types/IPlayList'

export const getPlaylist = async (playlistId: string): Promise<IPlayList> => {
  const res = await axios.get(`/api/playlists/${playlistId}`)
  return res.data
}

export const togglePlaylistVisibility = async (playlistId: string): Promise<void> => {
  await axios.patch(`/api/playlists/${playlistId}/visibility`)
}
