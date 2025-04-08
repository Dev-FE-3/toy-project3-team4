import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getLikeCount, hasUserLiked, likeVideo, unlikeVideo } from '../service/like'

export const useLikeData = (videoId: string, userId: number) => {
  // 리엑트 쿼리의 캐시 클라리언트에 직접 접근 하기 위해
  const queryClient = useQueryClient()

  // 좋아요 수 가져오기
  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', videoId],
    queryFn: () => getLikeCount(videoId),
  })

  // 해당 비디오에 좋아요를 눌렀는가
  const { data: isLiked } = useQuery({
    queryKey: ['hasLiked', videoId, userId],
    queryFn: () => hasUserLiked(videoId, userId),
    enabled: !!userId,
  })

  // 좋아요 토글 기능 (서버에 데이터를 변경하는 요청을 보냄)
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await unlikeVideo(videoId, userId)
      } else {
        await likeVideo(videoId, userId)
      }
    },
    onSuccess: () => {
      //성공했을시
      // 좋아요를 눌렀다면 좋아요 수와 좋아요 여부가 바뀔 테니 캐시를 무효화(지움) => 그러면 다시 fetch 하게 됨
      queryClient.invalidateQueries({ queryKey: ['likeCount', videoId] })
      queryClient.invalidateQueries({ queryKey: ['hasLiked', videoId, userId] })
    },
  })

  return { likeCount, isLiked, toggleLike, isPending }
}
