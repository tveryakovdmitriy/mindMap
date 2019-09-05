import {Schema} from 'mongoose'

const MapSchema = new Schema ({
  name: {type: String, required: 'name is required', default: 'My map'},
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
})