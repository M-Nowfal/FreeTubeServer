import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  history: [{
    url: String,
    title: String
  }]
});

UserSchema.index({ username: 1 });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);