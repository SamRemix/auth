import prisma from '../prisma'

const isAnExistingAlbum = async (title: string) => {
  const album = await prisma.album.findUnique({
    where: { title }
  })

  if (album) {
    throw new Error(`The ${title} album already exists`)
  }

  return album
}

export default isAnExistingAlbum