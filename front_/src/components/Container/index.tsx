import './styles.scss'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

type ContainerProps = {
  title: string
  children?: React.ReactNode
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <section className="page">
      <motion.h1 className="page-title" {...animation.title}>{title}</motion.h1>

      <motion.div className="page-content" {...animation.content}>
        {children}
      </motion.div>
    </section>
  )
}

export default Container