import { createPortal } from 'react-dom'
import { AlertProps } from './type/IAlertInfo'
import { motion } from 'framer-motion'

const Alert = ({
  title,
  description,
  onConfirm,
  onCancel,
  container = document.querySelector('#view-container') as HTMLElement,
  confirmText = '확인',
  cancelText = '취소',
  hideCancelButton = true,
}: AlertProps) => {
  const alertContent = (
    <div className="fixed bottom-0 top-0 z-[999] flex w-[430px] items-center justify-center bg-black/20" onClick={onCancel}>
      <motion.div
        className="w-[355px] rounded-lg bg-basic-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">{title}</h3>
          <p className="mb-10 text-sm text-gray-medium-dark">{description}</p>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {!hideCancelButton && (
            <button
              className="rounded-md bg-gray-light px-4 py-2 text-sm font-medium text-gray-dark shadow-none hover:bg-gray-light-medium"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button className="rounded-md bg-main-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-600" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  )

  if (!container) return null
  return createPortal(alertContent, container)
}

export default Alert
