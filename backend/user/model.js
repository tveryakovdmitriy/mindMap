import {Schema} from 'mongoose'

const UserSchema = new Schema({
  name: {type: String, required: 'name is required for user'},
  email: {type: String, required: 'email is required for user'},
  password: {type: String, required: 'password is required for user'},
  map: [{type: Schema.Types.ObjectId, ref: 'Map'}]
});

export default mongoose.model('User', UserSchema);