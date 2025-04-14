import { Button } from '@/shared/lib/shadcn/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface ITabMenuProps {
  onChangeTab: (tab: 'video' | 'playlist') => void
}

const TabMenu: React.FC<ITabMenuProps> = ({ onChangeTab }) => {
  const [activeTab, setActiveTab] = useState('video')

  const handleTabClick = (tab: 'video' | 'playlist') => {
    onChangeTab(tab)
    setActiveTab(tab)
  }

  return (
    <div className="flex justify-between text-gray-500">
      <div>
        <button
          onClick={() => handleTabClick('video')}
          className={
            activeTab === 'video'
              ? 'border-b-[3px] border-b-gray-dark px-[6px] py-[8px] text-[14px] font-normal text-basic-black'
              : 'border-b-[3px] border-transparent px-[6px] py-[8px] text-[14px]'
          }
        >
          동영상
        </button>
        <button
          onClick={() => handleTabClick('playlist')}
          className={
            activeTab === 'playlist'
              ? 'border-b-[3px] border-b-gray-dark px-[6px] py-[8px] text-[14px] font-normal text-basic-black'
              : 'border-b-[3px] border-transparent px-[6px] py-[8px] text-[14px]'
          }
        >
          플레이리스트
        </button>
      </div>

      {activeTab === 'playlist' && (
        <Button
          className="h-[32px] border border-gray-light-medium bg-basic-white px-[10px] py-[8px] text-sm text-gray-dark shadow-none"
          onClick={() => console.log('플리 추가 버튼 클릭')}
        >
          <Plus />새 플레이리스트
        </Button>
      )}
    </div>
  )
}

export default TabMenu
