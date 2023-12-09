import prisma from '../prisma'

const findAlbum = async (id: string) => {
  const album = await prisma.album.findUnique({
    where: { id }
  })

  if (!album) {
    throw new Error('Album not found')
  }

  return album
}

export default findAlbum