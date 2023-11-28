import { motion } from 'framer-motion'
import { animation } from './motion.config'

const transition = (Component: any) => {
  return () => (
    <>
      <Component />

      <motion.div
        className="slide-in"
        {...animation.slideIn}
      />

      <motion.div
        className="slide-out"
        {...animation.slideOut}
      />
    </>
  )
}

export default transition