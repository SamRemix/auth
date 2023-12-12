import { Request, Response, NextFunction } from 'express'

import AlbumsService from './albums.service'

const albumsService = new AlbumsService()

class AlbumsController {
  create = async ({ body, file }: Request, res: Response, next: NextFunction) => {
    try {
      const album = await albumsService.create({ ...body, cover: file?.filename })

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

  findOne = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const album = await albumsService.findOne(params.id)

      res.status(200).json(album)
    } catch (error) {
      next(error)
    }
  }

  update = async ({ params, body }: Request, res: Response, next: NextFunction) => {
    try {
      const album = await albumsService.update(params.id, body)

      res.status(200).json(album)
    } catch (error) {
      next(error)
    }
  }

  remove = async ({ params }: Request, res: Response, next: NextFunction) => {
    try {
      const album = await albumsService.remove(params.id)

      res.status(200).json(album)
    } catch (error) {
      next(error)
    }
  }
}

export default AlbumsController