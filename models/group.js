const mongoose = require('mongoose');

const groupNames = mongoose.Schema({
    name: {type: String, default: ''},
    rulesetting: {type: String, default: ''},
    image: {type: String, default: 'default.png'},
    players: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Group', groupNames);