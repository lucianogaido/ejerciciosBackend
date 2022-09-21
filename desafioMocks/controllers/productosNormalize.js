const messageModel = require('../models/messages.js')
const {normalize, schema}= require('normalizr')

const getMessages = async (req, res, next) => {

  const authorSchema = new schema.Entity('author', {} ,{ idAttribute: 'email' })
  const contentSchema = new schema.Entity('contents')
  const messageSchema = new schema.Entity('messages', {
    author: authorSchema,
    contents: [contentSchema]
  })

  try {
    const messages = await messageModel.find()
    const normalized = normalize(messages, messageSchema)
    res.status(200).json(normalized.entities.messages.undefined)
  } catch(err){
    res.status(401).json({msg: err.message})
    next()
  }
}

const postMessage = async (req, res, next) => {
  const obj = req.body
  const msg = new messageModel(obj)
  try {
    await msg.save()
    res.status(200).json(msg)
  } catch(err){
    res.status(404).json({msg: err.message})
    next()
  }
}

const deleteAll = async (req, res, next) => {
  try {
    await messageModel.deleteMany()
    res.status(200).json({msg: 'empty'})
  } catch(err){
    res.status(404)
    next()
  }
}

module.exports ={
    getMessages,
    postMessage,
    deleteAll

}