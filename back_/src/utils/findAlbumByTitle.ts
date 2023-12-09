import prisma from '../prisma'

const findAlbumByTitle = async (title: string) => (
  await prisma.album.findUnique({
    where: {
      title
    }
  })
)

export default findAlbumByTitle