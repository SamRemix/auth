import { Router } from 'express'

import AlbumsController from './albums.controller'

import requireAuth from '../../middlewares/requireAuth'
import requireAdmin from '../../middlewares/requireAdmin'

const albumsRouter = Router()

const { create, findAll, remove } = new AlbumsController()

albumsRouter
  .get('/', findAll)
  .use(requireAuth, requireAdmin)
  .post('/', create)
  .delete('/:id', remove)

export default albumsRouter