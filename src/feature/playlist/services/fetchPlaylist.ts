// src/api/playlist.service.ts
import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { ILocalPlaylist, ILocalVideoItem } from '../types/IPlayList'

export const fetchPlaylistFromDB = async (playlistId: number): Promise<ILocalPlaylist> => {
  const { data } = await axiosInstance.get(`/playlist?id=eq.${playlistId}&select=*`)
  if (!data || data.length === 0) throw new Error('플레이리스트 없음')
  return data[0]
}

export const fetchVideoListFromDB = async (playlistId: number): Promise<ILocalVideoItem[]> => {
  const { data } = await axiosInstance.get(`/videolist?playlist_id=eq.${playlistId}&select=*&order=created_at.asc`)
  return data
}
