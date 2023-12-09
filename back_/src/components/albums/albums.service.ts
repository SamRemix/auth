import prisma from '../../prisma'

import isEmpty from '../../utils/isEmpty'
import isAnExistingAlbum from '../../utils/isAnExistingAlbum'
import findAlbum from '../../utils/findAlbum'

type AlbumProps = {
  title: string
  release: string
}

class AlbumsService {
  create = async (body: AlbumProps) => {
    const { title, release } = body

    try {
      isEmpty({ title, release })

      await isAnExistingAlbum(title)

      const album = await prisma.album.create({
        data: { ...body }
      })

      return {
        album,
        message: `You added ${album.title}! 🎸`
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

  findOne = async (id: string) => {
    try {
      return await findAlbum(id)
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  update = async (id: string, body: AlbumProps) => {
    const { title, release } = body

    let newAlbum = {
      title: '',
      release: ''
    }

    try {
      const currentAlbum = await findAlbum(id)

      if ((title === currentAlbum.title) && (release === currentAlbum.release)) {
        return
      }

      if (title) {
        if (title === currentAlbum.title) {
          newAlbum.title = currentAlbum.title
        } else {
          await isAnExistingAlbum(title)

          newAlbum.title = title
        }
      }

      if (release) {
        release === currentAlbum.release
          ? newAlbum.release = currentAlbum.release
          : newAlbum.release = release
      }

      const album = await prisma.album.update({
        where: { id },
        data: { ...newAlbum }
      })

      return {
        album,
        message: `You updated ${currentAlbum.title}`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }

  remove = async (id: string) => {
    try {
      const album = await findAlbum(id)

      await prisma.album.delete({
        where: { id }
      })

      return {
        message: `You deleted ${album.title}`
      }
    } catch ({ message }: any) {
      throw new Error(message)
    }
  }
}

export default AlbumsService