import mongoose, {Schema} from 'mongoose'

export const BlockSchema = new Schema({
  title: {type: String, required: 'title is required'},
  description: {type: String},
  style: Schema.Types.Mixed,
  parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Block', default: null},
  coordinates: {x: Number, y: Number},
});

export const Block = mongoose.model('Block', BlockSchema)
