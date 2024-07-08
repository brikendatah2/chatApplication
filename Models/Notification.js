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
    read: { 
      type: Boolean, 
      default: false 
    },
    timestamp: { type: Date, 
      default: Date.now 
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
