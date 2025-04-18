import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { useMutation } from '@tanstack/react-query'

const addVideoToPlaylist = async ({ playlistId, videoId }: { playlistId: number; videoId: string }) => {
  const { data: existingItems } = await axiosInstance.get('/videolist', {
    params: {
      playlist_id: `eq.${playlistId}`,
      order: 'order.desc',
      limit: 1,
    },
  })

  const maxOrder = existingItems.length > 0 ? existingItems[0].order : 0

  await axiosInstance.post('/videolist', {
    playlist_id: playlistId,
    video_id: videoId,
    order: maxOrder + 1,
  })
}

export const useAddVideoToPlaylist = () => {
  return useMutation({
    mutationFn: addVideoToPlaylist,
  })
}
