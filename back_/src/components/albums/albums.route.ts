import { Router } from 'express'

import AlbumsController from './albums.controller'

import requireAuth from '../../middlewares/requireAuth'
import requireAdmin from '../../middlewares/requireAdmin'

const albumsRouter = Router()

const { findAll, findOne, create, update, remove } = new AlbumsController()

albumsRouter
  .get('/', findAll)
  .get('/:id', findOne)
  .use(requireAuth, requireAdmin)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', remove)

export default albumsRouter