import './styles.scss'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

type ContainerProps = {
  title: string
  justifyContent?: boolean
  children?: React.ReactNode
}

const Container = ({ title, justifyContent, children }: ContainerProps) => {
  document.title = `Bhland - ${title}`

  return (
    <section className={justifyContent ? 'page isJustify' : 'page'}>
      <motion.h1 className="page-title" {...animation.title}>{title}</motion.h1>

      <motion.div className="page-content" {...animation.content}>
        {children}
      </motion.div>
    </section>
  )
}

export default Container