const mongoose = require('mongoose');
const {ObjectID}=require('mongodb');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

module.exports={
    mongoose:mongoose,
    ObjectID:ObjectID
}