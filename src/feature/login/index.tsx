import { Button } from '@/shared/lib/shadcn/ui/button'
import { supabase } from '@/shared/lib/supabase/supabaseClient'
import { Link } from 'react-router-dom'

const Login = () => {
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // 로그인 후 리다이렉트
      },
    })

    if (error) {
      console.error('OAuth Login Error:', error.message)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      {/* 메인로고 */}
      <article>
        <img src="/image/logo/main-logo.png" alt="" className="p-6" />
      </article>
      <article className="mt-10 flex flex-col items-center gap-1 text-gray-dark">
        <p className="font-light">취향으로 가득 채우자!</p>
        <p className="font-semibold">나만의 플레이리스트를 완성해 보세요</p>
      </article>
      <article className="mt-14 flex flex-col items-center gap-4 font-semibold">
        <Button
          onClick={() => handleOAuthLogin('google')}
          className="w-[320px] rounded-3xl border bg-basic-white py-6 text-basic-black shadow-none hover:bg-basic-white hover:text-basic-black"
        >
          <img src="/image/icon/google.png" alt="구글" className="mr-1" />
          Google 계정으로 로그인
        </Button>
        <Button
          onClick={() => handleOAuthLogin('github')}
          className="w-[320px] rounded-3xl border bg-basic-white py-6 text-basic-black shadow-none hover:bg-basic-white hover:text-basic-black"
        >
          <img src="/image/icon/github.png" alt="깃허브" className="mr-1" />
          GitHub 계정으로 로그인
        </Button>
      </article>
      <article className="mt-20 flex items-center justify-center gap-4 text-sm">
        <span className="text-gray-medium-dark">당신의 취향을 공유해 주세요!</span>
        <Link to="/register" className="font-semibold text-main-primary">
          회원가입
        </Link>
      </article>
    </section>
  )
}

export default Login
