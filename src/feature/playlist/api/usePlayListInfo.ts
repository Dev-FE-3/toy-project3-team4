import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/shared/lib/axios/axiosInstance'
import { fetchYoutubePlayListInfo } from '@/shared/util/youtube'

const fetchSupabasePlayListInfo = async (userId: number, playListId: string) => {
  const result = await axiosInstance.get(`/playlist`, {
    params: {
      user_id: `eq.${userId}`,
      id: `eq.${playListId}`,
    },
  })

  const data = result.data[0]

  return {
    title: data.name,
    channelTitle: '내 채널',
    id: data.id,
  }
}

const usePlayListInfo = (userId: number | undefined, playListId: string, myself: boolean) => {
  return useQuery({
    queryKey: ['playlistInfo', myself ? 'me' : 'yt', playListId],
    queryFn: async () => {
      if (myself) {
        if (!userId) throw new Error('userId is required for my playlist')
        return await fetchSupabasePlayListInfo(userId, playListId)
      } else {
        const data = await fetchYoutubePlayListInfo(playListId)
        return {
          title: data.items[0].snippet.title,
          channelTitle: data.items[0].snippet.channelTitle,
          id: data.items[0].id,
        }
      }
    },
    enabled: !!playListId && (myself ? !!userId : true),
    staleTime: 1000 * 60 * 5,
  })
}

export default usePlayListInfo
