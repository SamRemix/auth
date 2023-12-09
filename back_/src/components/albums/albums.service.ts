import prisma from '../../prisma'

import isEmpty from '../../utils/isEmpty'
import findAlbumByTitle from '../../utils/findAlbumByTitle'

type AlbumProps = {
  title: string
  release: string
}

class AlbumsService {
  create = async (newAlbum: AlbumProps) => {
    const { title, release } = newAlbum

    try {
      isEmpty({ title, release })

      const exists = await findAlbumByTitle(title)

      if (exists) {
        throw new Error(`The ${title} album already exists`)
      }

      const album = await prisma.album.create({
        data: {
          ...newAlbum
        }
      })

      return {
        album,
        message: `You add ${album.title}! 🎸`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  findAll = async () => {
    try {
      const albums = await prisma.album.findMany({
        orderBy: {
          release: 'desc'
        }
      })

      if (!albums.length) {
        throw new Error('No albums found')
      }

      return albums
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default AlbumsService