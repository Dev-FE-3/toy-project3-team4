import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/supabaseClient'

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
      if (!userId) {
        throw new Error('로그인 후 이용해 주세요')
      }
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
    onError: (error) => {
      if (error instanceof Error) {
        console.log(error.message)
      }
    },
  })

  return { likeCount, isLiked, toggleLike, isPending }
}

// ✅ 현재 영상의 좋아요 수를 받아옴
const getLikeCount = async (videoId: string): Promise<number> => {
  const { count, error } = await supabase.from('like').select('*', { count: 'exact', head: true }).eq('video_id', videoId)

  if (error) {
    console.log('좋아요 수 가져오기 실패', error)
    return 0
  }
  return count ?? 0
}

// ✅ 슈퍼베이스에 유저가 해당 비디오에 좋아요를 눌렀는지 확인
const hasUserLiked = async (videoId: string, userId: number) => {
  const { data, error } = await supabase.from('like').select('*').eq('video_id', videoId).eq('user_id', userId)
  if (error) throw error
  return data.length > 0
}

// ✅ 슈퍼베이스에 like 테이블에  videoId , userId 포함한 새로운 row를 추가
const likeVideo = async (videoId: string, userId: number) => {
  const { error } = await supabase.from('like').insert([{ video_id: videoId, user_id: userId }])
  if (error) throw error
}

// ✅ 슈퍼베이스에 like 테이블에 저장된 videoId , userId row를 삭제
const unlikeVideo = async (videoId: string, userId: number) => {
  const { error } = await supabase.from('like').delete().eq('video_id', videoId).eq('user_id', userId)
  if (error) throw error
}
