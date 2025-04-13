import { PlaylistCreationResult, PlaylistCreationStatus } from '../type/PlaylistCreationStatus'
import { PlaylistVideoItem } from '../type/IPlaylistResultTypes'
import axiosInstance from '@/shared/lib/axios/axiosInstance'

const createPlaylistFromYouTube = async (videoList: PlaylistVideoItem[], playlistTitle: string, userId: number): Promise<PlaylistCreationResult> => {
  try {
    // 0. 플레이리스트 중복 확인
    const isPlaylistExists = await axiosInstance.get('/playlist', {
      params: {
        name: `eq.${playlistTitle}`,
        user_id: `eq.${userId}`,
      },
    })

    if (isPlaylistExists.data?.length) {
      return PlaylistCreationStatus.PLAYLIST_EXISTS
    }

    // 1. 플레이리스트 정보 저장
    const playlistResponse = await axiosInstance.post(
      '/playlist',
      {
        name: playlistTitle,
        access: true, // 기본값 공개
        user_id: userId,
      },
      {
        headers: {
          Prefer: 'return=representation',
        },
      },
    )

    const savedPlaylistId = playlistResponse.data[0]?.id

    if (!savedPlaylistId) {
      return PlaylistCreationStatus.SAVE_FAILED
    }

    // 2. 비디오 목록 저장
    const videoItems = videoList.map((video, index) => ({
      playlist_id: savedPlaylistId,
      video_id: video.snippet.resourceId.videoId,
      order: index + 1,
    }))

    await axiosInstance.post('/videolist', videoItems)

    return PlaylistCreationStatus.SUCCESS
  } catch (error) {
    console.error('Error in createPlaylistFromYouTube:', error)
    return PlaylistCreationStatus.SAVE_FAILED
  }
}

export default createPlaylistFromYouTube
