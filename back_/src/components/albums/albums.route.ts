import { Router } from 'express'

import AlbumsController from './albums.controller'

import requireAuth from '../../middlewares/requireAuth'
import requireAdmin from '../../middlewares/requireAdmin'

import uploadCover from '../../middlewares/uploadCover'

const albumsRouter = Router()

const { findAll, findOne, create, update, remove } = new AlbumsController()

albumsRouter
  .get('/', findAll)
  .get('/:id', findOne)
  .use(requireAuth, requireAdmin)
  .post('/', uploadCover, create)
  .patch('/:id', update)
  .delete('/:id', remove)

export default albumsRouter