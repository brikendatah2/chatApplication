const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    file: {
        type: String,
        default: "",
        validate: {
            validator: function(v) {
                const fileTypes = [
                    'pdf', 'jpg', 'png', 'gif', 'doc', 'docx',
                    'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'mp3',
                    'mp4', 'avi', 'mkv', 'zip', 'rar'
                ];
                return v === "" || fileTypes.includes(v.toLowerCase());
            },
            message: props => `${props.value} is not a supported file type!`
        }
    },
    seen: {
        type: Boolean,
        default: false
    },
    msgByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    msgReciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
