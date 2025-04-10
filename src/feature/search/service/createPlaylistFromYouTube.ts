import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { PlaylistVideoItem } from '../type/IPlaylistResultTypes'
import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { CreatePlaylistResult } from '../type/ICreatePlaylistResult'

const createPlaylistFromYouTube = async (videoList: PlaylistVideoItem[], playlistTitle: string): Promise<CreatePlaylistResult> => {
  try {
    const user = useAuthStore.getState().user
    if (!user) {
      return {
        type: 'USER_NOT_FOUND',
        message: '로그인 후 이용해주세요.',
      } as CreatePlaylistResult
    }

    // 0. 플레이리스트 중복 확인
    const isPlaylistExists = await axiosInstance.get('/playlist', {
      params: {
        name: `eq.${playlistTitle}`,
        user_id: `eq.${user.id}`,
      },
    })

    if (isPlaylistExists.data?.length) {
      return {
        type: 'PLAYLIST_EXISTS',
        message: '이미 존재하는 플레이리스트입니다.',
      } as CreatePlaylistResult
    }

    // 1. 플레이리스트 정보 저장
    const playlistResponse = await axiosInstance.post('/playlist', {
      name: playlistTitle,
      access: true, // 기본값 공개
      user_id: user.id,
    })

    const savedPlaylistId = playlistResponse.data[0]?.id

    if (!savedPlaylistId) {
      return {
        type: 'SAVE_FAILED',
        message: '플레이리스트 저장에 실패했습니다.',
      } as CreatePlaylistResult
    }

    // 2. 비디오 목록 저장
    const videoItems = videoList.map((video, index) => ({
      playlist_id: savedPlaylistId,
      video_id: video.snippet.resourceId.videoId,
      order: index + 1,
    }))

    await axiosInstance.post('/videolist', videoItems)

    return {
      type: 'SUCCESS',
      message: '플레이리스트가 정상적으로 저장되었습니다.',
    } as CreatePlaylistResult
  } catch (error) {
    console.error('Error in createPlaylistFromYouTube:', error)
    return {
      type: 'SAVE_FAILED',
      message: '플레이리스트 저장 중 오류가 발생했습니다.',
    } as CreatePlaylistResult
  }
}

export default createPlaylistFromYouTube
