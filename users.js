const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('users',schema);