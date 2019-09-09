import mongoose from 'mongoose'
import blockSerice from '../block/service'

export const MindMapSchema = new mongoose.Schema ({
  name: {type: String, required: 'name is required', default: 'My map'},
  blocks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Block'}]
})

MindMapSchema.post('remove', function(mindMap) {
  if (mindMap && mindMap.blocks && mindMap.blocks.length) {
    blockSerice.bulkDelete(mindMap.blocks)
  }
})


export const MindMap = mongoose.model('MindMap', MindMapSchema)