import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/lib/shadcn/ui/select'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { motion } from 'framer-motion'
import INewPlayListModalProps from './type/INewPlayListModalProps'
import { useNewPlayList } from './api/useNewPlayList'
import { useAuthStore } from '@/shared/store/auth/useAuthStore'

const NewPlayListModal = ({ videoId, closeModal, setAlertInfo }: INewPlayListModalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const [access, setAccess] = useState('Y') // 공개 여부 상태
  const [title, setTitle] = useState('') // 제목 상태 추가
  const userId = useAuthStore((store) => store.user?.id) || 21
  const { mutate: addNewPlayList } = useNewPlayList()

  useEffect(() => {
    const target = document.getElementById('view-container')
    setContainer(target)
  }, [])

  if (!container) return null

  const newPlayList = () => {
    //새 플레이리스트 생성과 동시에 선택된 동영상 id insert
    addNewPlayList(
      { userId, title, access, videoId },
      {
        onSuccess: () => {
          setAlertInfo({
            title: '안내',
            description: '새 플레이리스트가 생성됐어요!',
            onConfirm: () => {
              closeModal()
              setAlertInfo(null)
            },
          })
        },
        onError: () => {
          setAlertInfo({
            title: '안내',
            description: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
            onConfirm: () => setAlertInfo(null),
            hideCancelButton: true,
          })
        },
      },
    )
  }

  const modalContent = (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-[355px] rounded-lg border bg-basic-white p-[20px] shadow-none">
        <h4 className="text-lg font-bold">새 플레이리스트</h4>

        <div className="mt-5 rounded-lg border px-[12px] py-[8px]">
          <h6 className="text-sm text-gray-medium-dark">제목</h6>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="재생목록"
            className="w-full border-none text-base outline-none"
          />
        </div>

        <div className="mt-2 rounded-lg border px-[12px] py-[8px]">
          <h6 className="text-sm text-gray-medium-dark">공개 상태</h6>
          <Select value={access} onValueChange={(val) => setAccess(val)}>
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
          <Button onClick={closeModal} className="bg-gray-light text-gray-dark shadow-none hover:bg-gray-light-medium">
            취소
          </Button>
          <Button onClick={newPlayList} className="bg-main-primary hover:bg-blue-600">
            저장
          </Button>
        </div>
      </div>
    </motion.div>
  )

  return ReactDOM.createPortal(modalContent, container)
}

export default NewPlayListModal
