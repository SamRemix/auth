import './styles.scss'

import { AnimatePresence, motion } from 'framer-motion'
import { animation } from './motion.config'

import { XMarkIcon } from '@heroicons/react/24/outline'

import useToast from '../../hooks/useToast'

const Toasts = () => {
  const { toasts, removeToast } = useToast()

  return (
    <motion.div className="toasts-container">
      <AnimatePresence mode="popLayout">
        {toasts.map(({ id, text, type, duration }) => (
          <motion.div
            key={id.toString()}
            layoutId={id.toString()}
            className={type === 'error' ? 'toast-error' : 'toast'}
            {...animation}>
            <p className="toast-content">{text}</p>

            <XMarkIcon
              className="remove"
              width="1.5rem"
              strokeWidth={1}
              onClick={() => removeToast(id)}
            />

            <div className="indicator" style={{ animationDuration: `${duration}s` }} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default Toasts