import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import { INewPlaylistParams } from '../type/INewPlaylistParams'

export const useNewPlayList = () => {
  return useMutation({
    mutationFn: async ({ userId, title, access, videoId }: INewPlaylistParams) => {
      const { data: playlistRes } = await axiosInstance.post(
        '/playlist',
        {
          user_id: userId,
          name: title,
          access,
        },
        {
          headers: {
            Prefer: 'return=representation',
          },
        },
      )

      const newPlaylistId = playlistRes?.[0]?.id

      if (videoId && newPlaylistId) {
        await axiosInstance.post('/videolist', {
          playlist_id: newPlaylistId,
          video_id: videoId,
          order: 1,
        })
      }

      return newPlaylistId
    },
  })
}
