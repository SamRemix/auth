import prisma from '../../prisma'

type AlbumProps = {
  title: string
  release: string
}

class AlbumsService {
  create = async (newAlbum: AlbumProps) => {
    try {
      const album = await prisma.album.create({
        data: {
          ...newAlbum
        }
      })

      return album
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