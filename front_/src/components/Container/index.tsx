import './styles.scss'

import Toasts from '../Toasts'

type ContainerProps = {
  title: string,
  children?: React.ReactNode
}

const Container = ({ title, children }: ContainerProps) => {
  return (
    <section className="page">
      <h1 className="page-title">{title}</h1>

      <div className="page-content">
        {children}
      </div>

      <Toasts />
    </section>
  )
}

export default Container