import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/lib/shadcn/ui/select'
import { Button } from '@/shared/lib/shadcn/ui/button'

const NewPlayListModal = ({ video_id }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  if (!container) return null

  const modalContent = (
    <div className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <div className="w-[355px] rounded-lg border bg-basic-white p-[20px] shadow-none">
        <h4 className="text-lg font-bold">새 플레이리스트</h4>
        <div className="mt-5 rounded-lg border px-[12px] py-[8px]">
          <h6 className="text-sm text-gray-medium-dark">제목</h6>
          케이팝
        </div>
        <div className="mt-2 rounded-lg border px-[12px] py-[8px]">
          <h6 className="text-sm text-gray-medium-dark">공개 상태</h6>
          <Select defaultValue="Y">
            <SelectTrigger className="h-auto border-none p-0 text-lg shadow-none focus:outline-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y">공개</SelectItem>
              <SelectItem value="N">비공개</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-5 flex justify-end gap-2 text-sm">
          <Button className="bg-gray-light text-gray-dark shadow-none">취소</Button>
          <Button className="bg-main-primary">만들기</Button>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default NewPlayListModal
