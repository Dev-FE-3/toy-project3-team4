import { AlertInfo } from '@/shared/components/alert/type/IAlertInfo'

export default interface INewPlayListModalProps {
  videoId: string
  closeModal: () => void
  setAlertInfo: (alertInfo: AlertInfo | null) => void
}
