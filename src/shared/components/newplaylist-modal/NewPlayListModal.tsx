import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/lib/shadcn/ui/select'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { motion } from 'framer-motion'
import INewPlayListModalProps from './type/INewPlayListModalProps'

const NewPlayListModal = ({ video_id, closeModal }: INewPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  if (!container) return null

  const newPlayList = () => {
    console.log(video_id)
  }

  const modalContent = (
    <motion.div
      className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
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
          <Button onClick={closeModal} className="bg-gray-light text-gray-dark shadow-none">
            취소
          </Button>
          <Button onClick={newPlayList} className="bg-main-primary">
            저장
          </Button>
        </div>
      </div>
    </motion.div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default NewPlayListModal
