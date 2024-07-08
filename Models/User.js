const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { 
      type: String, 
      required: true 
    },
    lastname: { 
      type: String, 
      required: true 
    },
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    profile_pic: { 
      type: String, 
      default: "" 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
