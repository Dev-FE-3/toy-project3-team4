import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { useUpsertUser } from './api/useUpsertUser'
import axiosInstance from '@/shared/lib/axios/axiosInstance'

const AuthCallback = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((state) => state.setUser)
  const setUserId = useAuthStore((state) => state.setUserId)
  const { mutate: upsertUser } = useUpsertUser()

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        const user = data.session.user
        setUser(user) // ✅ Zustand에 Supabase Auth 유저 정보 저장

        // ✅ Supabase DB에서 user_id 조회
        try {
          const { data: users } = await axiosInstance.get(`/users?uid=eq.${user.id}`)
          if (users.length > 0) {
            setUserId(users[0].id) // ✅ Zustand에 DB의 user_id 저장
          }
        } catch (error) {
          console.error('사용자 ID 조회 실패:', error)
        }

        upsertUser(user, {
          onSuccess: () => navigate('/'), // ✅ 성공 시 홈으로 이동
        })
      } else {
        navigate('/login') // 세션 없으면 다시 로그인 페이지로
      }
    }

    fetchSession()
  }, [navigate, setUser, setUserId, upsertUser])

  return <p>로그인 처리 중...</p>
}

export default AuthCallback
