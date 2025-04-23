import { useQueries } from '@tanstack/react-query'
import { IView } from '../type/IView'
import { fetchYoutubePlayListInfo, fetchYoutubeVideoInfo } from '@/shared/util/youtube'

export const ViewType = {
  VIDEO: 'video',
  PLAYLIST: 'playlist',
} as const

export type ViewType = (typeof ViewType)[keyof typeof ViewType]

const useYoutubeLinkInfo = (views: IView[]) => {
  const validViews =
    views?.filter((v) => {
      const isValidType = v.type === ViewType.VIDEO || v.type === ViewType.PLAYLIST
      return Boolean(v.view_id && isValidType)
    }) ?? []

  return useQueries({
    queries: validViews.map((view) => {
      const { view_id, type } = view

      return {
        queryKey: ['youtube-links', type, view_id],
        queryFn: () => (type === ViewType.VIDEO ? fetchYoutubeVideoInfo(view_id) : fetchYoutubePlayListInfo(view_id)),
        enabled: !!view_id,
        staleTime: 1000 * 60 * 5,
      }
    }),
  })
}

export default useYoutubeLinkInfo
