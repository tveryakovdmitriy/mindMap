import {Schema} from 'mongoose'

const BlockSchema = new Schema({
  title: {type: String, required: 'title is required'},
  description: {type: String},
  style: Schema.Types.Mixed,
  blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
  parentId: {type: Schema.Types.ObjectId, ref: 'Block'},
  mapId: {type: Schema.Types.ObjectId, ref: 'Map'}
});

export default mongoose.model('Block', NoteScheme);