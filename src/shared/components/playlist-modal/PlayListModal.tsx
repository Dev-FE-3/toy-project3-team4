import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { Plus, X, BookmarkPlus } from 'lucide-react'
import IPlayListModalProps from './type/IPlayListModalProps'

const PlayListModal = ({ closeModal }: IPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  const addPlayList = () => {}

  if (!container) return null

  const modalContent = (
    <div className="absolute bottom-[10px] left-1/2 z-50 -translate-x-1/2">
      <div className="h-[340px] w-[410px] rounded-md border bg-basic-white p-[15px] shadow-lg">
        <h4 className="flex items-center justify-between">
          <Button className="h-[32px] border border-gray-light-medium bg-basic-white px-[10px] py-[8px] text-sm text-gray-dark shadow-none">
            <Plus />새 플레이리스트
          </Button>
          <X onClick={closeModal} className="cursor-pointer text-gray-medium-dark" />
        </h4>
        <ul className="mt-4 flex flex-col gap-4">
          <li className="flex h-[56px] items-center justify-between">
            <div className="flex gap-4">
              <img className="size-14 rounded-lg" src="/public/image/logo/main-logo.png" alt="재생목록 사진" />
              <div>
                <p className="font-bold">권진아 노래모음</p>
                <span className="text-sm text-gray-medium-dark">비공개</span>
              </div>
            </div>
            <BookmarkPlus onClick={addPlayList} className="size-6 cursor-pointer" />
          </li>
        </ul>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default PlayListModal
