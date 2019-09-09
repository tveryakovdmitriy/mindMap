import mongoose from 'mongoose'
import blockController from '../block/controller'

export const MindMapSchema = new mongoose.Schema ({
  name: {type: String, required: 'name is required', default: 'My map'},
  blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Block'}]
})

MindMapSchema.post('remove', function(mindMap) {
  if (mindMap && mindMap.blocks && mindMap.blocks.length) {
    blockController.bulkDelete(mindMap.blocks)
  }
})


export const MindMap = mongoose.model('MindMap', MindMapSchema)