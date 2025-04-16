import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { AlertProps } from './type/IAlertInfo'

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
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container && overlayRef.current) {
      const updatePosition = () => {
        const containerRect = container.getBoundingClientRect()
        if (overlayRef.current) {
          overlayRef.current.style.left = `${containerRect.left}px`
          overlayRef.current.style.width = `${containerRect.width}px`
        }
      }

      updatePosition()
      window.addEventListener('resize', updatePosition)
      return () => window.removeEventListener('resize', updatePosition)
    }
  }, [container])

  const alertContent = (
    <>
      {/* 배경 오버레이 */}
      <div ref={overlayRef} className="fixed bottom-0 top-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
        {/* Alert 컨텐츠 */}
        <div className="w-[400px] rounded-lg bg-basic-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
          {/* 헤더 */}
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="mb-10 text-sm text-gray-medium-dark">{description}</p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {!hideCancelButton && (
              <button
                className="border-gray-medium-light rounded-md border px-4 py-2 text-sm font-medium text-gray-medium-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={onCancel}
              >
                {cancelText}
              </button>
            )}
            <button
              className="rounded-md bg-main-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  )

  if (!container) return null
  return createPortal(alertContent, container)
}

export default Alert
