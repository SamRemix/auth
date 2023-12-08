import { Router } from 'express'

import AlbumsController from './albums.controller'

const albumsRouter = Router()

const { create, findAll } = new AlbumsController()

albumsRouter
  .post('/', create)
  .get('/', findAll)

export default albumsRouter