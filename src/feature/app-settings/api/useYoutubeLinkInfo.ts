import { useQueries } from '@tanstack/react-query'
import { IView } from '../type/IView'
import { fetchYoutubePlayListInfo, fetchYoutubeVideoInfo } from '@/shared/util/youtube'

const useYoutubeLinkInfo = (views: IView[]) => {
  const validViews = views?.filter((v) => v.view_id && (v.type === 'video' || v.type === 'playlist')) ?? []

  return useQueries({
    queries: validViews.map((view) => {
      const { view_id, type } = view

      return {
        queryKey: ['youtube-links', type, view_id],
        queryFn: () => (type === 'video' ? fetchYoutubeVideoInfo(view_id) : fetchYoutubePlayListInfo(view_id)),
        enabled: !!view_id && (type === 'video' || type === 'playlist'),
        staleTime: 1000 * 60 * 5,
      }
    }),
  })
}

export default useYoutubeLinkInfo
