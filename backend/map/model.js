import mongoose from 'mongoose'

export const MindMapSchema = new mongoose.Schema ({
  name: {type: String, required: 'name is required', default: 'My map'},
  blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Block'}]
})

export const MindMap = mongoose.model('MindMap', MindMapSchema)