import './styles.scss'

import { motion } from 'framer-motion'
import { animation } from './motion.config'

type ContainerProps = {
  title: string
  settingsPage?: boolean
  justifyContent?: boolean
  children?: React.ReactNode
}

const Container = ({ title, settingsPage, justifyContent, children }: ContainerProps) => {
  document.title = `Bhland - ${title}`

  const setClassName = () => {
    let className = 'page'

    if (settingsPage) {
      className += ' settings'
    }

    if (justifyContent) {
      className += ' isJustify'
    }

    return className
  }

  return (
    <section className={setClassName()}>
      <motion.h1 className="page-title" {...animation.title}>{title}</motion.h1>

      <motion.div className="page-content" {...animation.content}>
        {children}
      </motion.div>
    </section>
  )
}

export default Container