const express = require('express')
const { deleteAll, getMessages, postMessage} = require('../controllers/productosNormalize.js')

const router = express.Router()

router.get('/', getMessages)
router.post('/', postMessage)
router.delete('/', deleteAll)

module.exports= router