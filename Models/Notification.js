const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    required: true 
  }, 
  message: { 
    type: String 
  }, 
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
