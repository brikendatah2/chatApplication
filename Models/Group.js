const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
},
members: [
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
],
createdBy: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
}
});

module.exports = mongoose.model('Group', groupSchema);
