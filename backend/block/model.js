import mongoose, {Schema} from 'mongoose'

export const BlockSchema = new Schema({
  title: {type: String, required: 'title is required'},
  description: {type: String},
  style: Schema.Types.Mixed,
  blocks: {type: [mongoose.Schema.Types.ObjectId], ref: 'Block'},
  parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Block'}
});

export const Block = mongoose.model('Block', BlockSchema)
