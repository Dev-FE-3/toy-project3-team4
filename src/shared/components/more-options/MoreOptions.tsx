import { EyeOff, Flag, MoreVertical, Share2 } from 'lucide-react'
import { useToggle } from '@/shared/components/more-options/hooks/useToggle'
import { StyledIcon } from './utils/icon'
import MoreOptionsProps from './type/MoreOptionsProps'
import MenuItem from './type/IMenuItem'
import MenuItemButton from './MenuItem'

const MoreOptions = ({ items }: MoreOptionsProps) => {
  const [isOpen, toggle] = useToggle()

  const fixedItems: MenuItem[] = [
    {
      icon: StyledIcon(EyeOff),
      label: '숨기기',
      onClick: () => {},
    },
    {
      icon: StyledIcon(Flag),
      label: '신고',
      onClick: () => {},
    },
    {
      icon: StyledIcon(Share2),
      label: '공유',
      onClick: () => {},
    },
  ]

  return (
    <div className="relative">
      <button onClick={toggle}>{StyledIcon(MoreVertical)}</button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={toggle} />
          <ul className="absolute right-0 top-[100%] z-10 min-w-[200px] rounded-lg border border-gray-light bg-basic-white py-1 shadow-lg">
            {/* 커스텀 메뉴 아이템 */}
            {items.map((item, index) => (
              <MenuItemButton key={index} item={item} onClose={toggle} />
            ))}

            {/* 고정 메뉴 아이템 */}
            {fixedItems.map((item, index) => (
              <MenuItemButton key={`fixed-${index}`} item={item} onClose={toggle} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default MoreOptions
