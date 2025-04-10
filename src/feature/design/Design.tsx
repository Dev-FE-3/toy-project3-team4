import ModalManager from '@/shared/components/playlist-modal/ModalManager'
import { Button } from '@/shared/lib/shadcn/ui/button'
import { usePlayListModalStore } from '@/shared/store/modal/usePlayListModalStore'

const Design = () => {
  const openPlayList = usePlayListModalStore((state) => state.openPlayList)

  return (
    <>
      <p className="bg-basic-white text-basic-black">bg-basic-white text-basic-black 입니다</p>
      <p className="bg-basic-black text-basic-white">bg-basic-black text-basic-white 입니다</p>
      <p className="text-gray-light">text-gray-light 입니다</p>
      <p className="text-gray-light-medium">text-gray-light-medium 입니다</p>
      <p className="text-gray-medium">text-gray-medium 입니다</p>
      <p className="text-gray-medium-dark">text-gray-medium-dark 입니다</p>
      <p className="text-gray-dark">text-gray-dark 입니다</p>
      <p className="text-gray-dark-reply">text-gray-dark-reply 입니다</p>
      <p className="text-main-primary">text-main-primary 입니다</p>
      <p className="text-main-warning">text-main-warning 입니다</p>
      <p className="text-main-success">text-main-success 입니다</p>

      <div className="mt-4">
        <Button onClick={openPlayList} className="bg-main-primary text-basic-white">
          플레이리스트 모달 열기
        </Button>
      </div>

      <ModalManager />
    </>
  )
}

export default Design
