import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'

export const useDeleteVideoToPlayList = () => {
  return useMutation({
    mutationFn: async ({ playlistId, videoId }: { playlistId: number; videoId: string }) => {
      const response = await axiosInstance.delete('/videolist', {
        params: {
          playlist_id: `eq.${playlistId}`,
          video_id: `eq.${videoId}`,
        },
      })

      return response.data
    },
  })
}
