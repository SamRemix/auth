import './styles.scss'

import formatDate from '../../utils/formatDate'

type AlbumProps = {
  id: string
  title: string
  release: string
}

const Album = ({ id, title, release }: AlbumProps) => {
  return (
    <div key={id} className="album">
      <p className="album-title">{title}</p>
      <p className="album-release">{formatDate(release)}</p>
    </div>
  )
}

export default Album