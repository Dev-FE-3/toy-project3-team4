import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { useUpsertUser } from './api/useUpsertUser'

const AuthCallback = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const { mutate: upsertUser } = useUpsertUser()

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        const user = data.session.user
        setAuth(user) // ✅ Zustand에 Supabase Auth 유저 정보 저장

        upsertUser(user, {
          onSuccess: () => navigate('/'), // ✅ 성공 시 홈으로 이동
        })
      } else {
        navigate('/login') // 세션 없으면 다시 로그인 페이지로
      }
    }

    fetchSession()
  }, [navigate, setAuth, upsertUser])

  return <p>로그인 처리 중...</p>
}

export default AuthCallback
