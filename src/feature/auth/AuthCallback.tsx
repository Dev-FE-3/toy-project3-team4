import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { useUpsertUser } from './api/useUpsertUser'

const AuthCallback = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const setUser = useAuthStore((state) => state.setUser)
  const { mutate: upsertUser } = useUpsertUser()

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        const user = data.session.user
        setAuth(user)

        upsertUser(user, {
          onSuccess: (userData) => {
            setUser(userData)
            navigate('/')
          },
        })
      } else {
        navigate('/login')
      }
    }

    fetchSession()
  }, [navigate, setAuth, setUser, upsertUser])

  return <p></p>
}

export default AuthCallback
