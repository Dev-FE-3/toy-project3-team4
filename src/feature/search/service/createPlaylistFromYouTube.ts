import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { PlaylistVideoItem } from '../type/IPlaylistResultTypes'
import axiosInstance from '@/shared/lib/axios/axiosInstance'

const createPlaylistFromYouTube = async (videoList: PlaylistVideoItem[], playlistTitle: string) => {
  try {
    const user = useAuthStore.getState().user
    if (!user) {
      alert('로그인 후 이용해주세요.')
      location.href = '/login'
      return
    }

    // 0. 플레이리스트 중복 확인
    const isPlaylistExists = await axiosInstance.get('/playlist', {
      params: {
        name: `eq.${playlistTitle}`,
        user_id: `eq.${user.id}`,
      },
    })

    if (isPlaylistExists.data?.length) {
      alert('이미 존재하는 플레이리스트입니다.')
      return
    }

    // 1. 플레이리스트 정보 저장
    const playlistResponse = await axiosInstance.post('/playlist', {
      name: playlistTitle,
      access: true, // 기본값 공개
      user_id: user.id,
    })

    const savedPlaylistId = playlistResponse.data[0]?.id

    if (!savedPlaylistId) {
      throw new Error('Failed to get saved playlist ID')
    }

    // 2. 비디오 목록 저장
    const videoItems = videoList.map((video, index) => ({
      playlist_id: savedPlaylistId,
      video_id: video.snippet.resourceId.videoId,
      order: index + 1,
    }))

    const videoListResponse = await axiosInstance.post('/videolist', videoItems)

    return {
      playlist: playlistResponse.data[0],
      videos: videoListResponse.data,
    }
  } catch (error) {
    console.error('Error in saveYouTubePlaylist:', error)
    throw error
  }
}

export default createPlaylistFromYouTube
