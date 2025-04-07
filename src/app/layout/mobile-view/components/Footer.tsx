import { Plus } from 'lucide-react'
import { Avatar } from '@/shared/lib/shadcn/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import NavItem from './NavItem'

const Footer = () => {
  const profileImage = '/image/download/background.svg'

  return (
    <nav className="fixed bottom-0 z-50 mx-auto flex h-[56px] w-[430px] items-center justify-center gap-10 border-t border-gray-light-medium bg-basic-white px-[15px] py-[8px]">
      <NavItem path="/" menu="홈" icon="home" />
      <NavItem path="/follow" menu="팔로잉" icon="following" />
      {/* 영상추가 */}
      <div className="flex h-[45px] w-[35px] cursor-pointer flex-col items-center justify-center">
        <Plus size={24} color="#78787E" strokeWidth={2} />
      </div>
      <NavItem path="/channel" menu="내 채널">
        <Avatar className="h-7 w-7">
          <AvatarImage className="rounded-full border border-gray-medium object-cover" src={profileImage} alt="프로필사진" />
        </Avatar>
      </NavItem>
      <NavItem path="/settings" menu="설정" icon="setting" />
    </nav>
  )
}

export default Footer
