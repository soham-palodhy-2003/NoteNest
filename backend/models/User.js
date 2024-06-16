const mongoose = require('mongoose');
const {Schema} = mongoose
// eslint-disable-next-line no-undef
const UserSchema = new Schema({
    name:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('user', UserSchema);

module.exports = User;