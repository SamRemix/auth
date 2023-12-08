import { Request, Response, NextFunction } from 'express'

import AlbumsService from './albums.service'

const albumsService = new AlbumsService()

class AlbumsController {
  create = async ({ body }: Request, res: Response, next: NextFunction) => {
    try {
      const album = await albumsService.create(body)

      res.status(200).json(album)
    } catch (error) {
      next(error)
    }
  }

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const albums = await albumsService.findAll()

      res.status(200).json(albums)
    } catch (error) {
      next(error)
    }
  }
}

export default AlbumsController