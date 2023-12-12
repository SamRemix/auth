import { extname } from 'node:path'

import multer from 'multer'

const storage = multer.diskStorage({
  destination(_req, _file, callback) {
    callback(null, './public/images')
  },
  filename({ body }, { originalname, fieldname }, callback) {
    callback(null, `${body.title.replaceAll(' ', '-')}_${fieldname + extname(originalname)}`)
  },
})

const uploadCover = multer({ storage }).single('cover')

export default uploadCover