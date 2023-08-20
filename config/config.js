const mongoose = require('mongoose');
require('dotenv').config();

const connectToServer = async()=>{

    await mongoose.connect(process.env.MONGO_URL)

}

module.exports = connectToServer