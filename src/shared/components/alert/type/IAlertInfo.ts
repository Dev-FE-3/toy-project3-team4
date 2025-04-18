export interface AlertInfo {
  title: string
  description: string
  hideCancelButton?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
}

export interface AlertProps extends AlertInfo {
  container?: HTMLElement
}
