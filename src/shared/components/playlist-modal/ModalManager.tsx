import { AnimatePresence, motion } from 'framer-motion'
import PlayListModal from './PlayListModal'
import NewPlayListModal from '../newplaylist-modal/NewPlayListModal'
import { usePlayListModalStore } from '@/shared/store/modal/usePlayListModalStore'
import { useState } from 'react'
import { AlertInfo } from '@/shared/components/alert/type/IAlertInfo'
import Alert from '@/shared/components/alert/Alert'

const ModalManager = ({ videoId }: { videoId: string }) => {
  const { isPlayListOpen, isNewPlayListOpen, closePlayList, switchToNewPlayList, switchToPlayList } = usePlayListModalStore()
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null)

  return (
    <>
      <AnimatePresence>
        {isPlayListOpen && (
          <motion.div
            key="playlist"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <PlayListModal closeModal={closePlayList} setModalStates={switchToNewPlayList} videoId={videoId} setAlertInfo={setAlertInfo} />
          </motion.div>
        )}

        {isNewPlayListOpen && (
          <motion.div
            key="newplaylist"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NewPlayListModal closeModal={switchToPlayList} videoId={videoId} setAlertInfo={setAlertInfo} />
          </motion.div>
        )}
      </AnimatePresence>
      {alertInfo && <Alert {...alertInfo} />}
    </>
  )
}

export default ModalManager
