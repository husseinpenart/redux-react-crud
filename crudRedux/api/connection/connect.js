const mongoose = require('mongoose');
const ConnectDB = async()=>{
    try {
        await  mongoose.connect('mongodb://0.0.0.0:27017/postRedux')
        console.log('mongodb connected')
    } catch (error) {
       console.log(error) 
    }
}
module.exports = ConnectDB