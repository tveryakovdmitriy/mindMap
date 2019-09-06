import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: 'name is required for user'},
  email: {type: String, required: 'email is required for user'},
  password: {type: String, required: 'password is required for user'},
  mindMaps: [{type: mongoose.Schema.Types.ObjectId, ref: 'MindMap'}]
});

export const User = mongoose.model('User', UserSchema);