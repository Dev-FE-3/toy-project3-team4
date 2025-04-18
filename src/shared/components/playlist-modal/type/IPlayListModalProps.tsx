import { AlertInfo } from '@/shared/components/alert/type/IAlertInfo'

export default interface IPlayListModalProps {
  closeModal: () => void
  setModalStates: () => void
  videoId: string
  setAlertInfo: (alertInfo: AlertInfo | null) => void
}
