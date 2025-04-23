import { Plus } from 'lucide-react'
import { Avatar } from '@/shared/lib/shadcn/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import NavItem from './NavItem'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'
import { House, TvMinimalPlay, Settings } from 'lucide-react'

const Footer = () => {
  const profileImage = useAuthStore((state) => state.user?.img) ?? '/image/download/background.svg'

  return (
    <nav className="fixed bottom-0 z-50 mx-auto flex h-[56px] w-[430px] items-center justify-center gap-10 border-t border-gray-light-medium bg-basic-white px-[15px] py-[8px]">
      <NavItem path="/" menu="홈" icon={House} />
      <NavItem path="/follow" menu="팔로잉" icon={TvMinimalPlay} />
      {/* 영상추가 */}
      <div className="flex h-[45px] w-[35px] cursor-pointer flex-col items-center justify-center">
        <Plus size={24} className="text-gray-medium-dark" strokeWidth={1.5} />
      </div>
      <NavItem path="/channel" menu="내 채널">
        <Avatar className="h-6 w-6">
          <AvatarImage className="rounded-full border border-gray-medium object-cover" src={profileImage} alt="프로필사진" />
        </Avatar>
      </NavItem>
      <NavItem path="/settings" menu="설정" icon={Settings} />
    </nav>
  )
}

export default Footer
