const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shubham:shubham@cluster0.yxgejlq.mongodb.net/cwh?retryWrites=true&w=majority"

port = 4000

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongoDb")
//     })
// }
// const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

module.exports = connectToMongo;

// module.exports = connectToMongo;