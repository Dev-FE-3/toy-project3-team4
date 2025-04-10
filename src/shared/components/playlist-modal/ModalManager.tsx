import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import PlayListModal from './PlayListModal'
import NewPlayListModal from '../newplaylist-modal/NewPlayListModal'
import { Button } from '@/shared/lib/shadcn/ui/button'

const ModalManager = ({ videoId = 't8P-zdkoeJA' }) => {
  const [isPlayListOpen, setPlayListOpen] = useState(false)
  const [isNewPlayListOpen, setNewPlayListOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setPlayListOpen(true)}>플레이리스트 모달 열기</Button>

      <AnimatePresence>
        {isPlayListOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            key="playlist"
          >
            <PlayListModal
              closeModal={() => setPlayListOpen(false)}
              setModalStates={() => {
                setPlayListOpen(false)
                setNewPlayListOpen(true)
              }}
              videoId={videoId}
            />
          </motion.div>
        )}

        {isNewPlayListOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            key="newplaylist"
          >
            <NewPlayListModal
              closeModal={() => {
                setNewPlayListOpen(false)
                setPlayListOpen(true)
              }}
              videoId={videoId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ModalManager
