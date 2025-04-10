const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   const t = await mongoose.connect(process.env.MONGO_URI);
    console.log(`'MongoDB connected to 'http://${t.connection.host}/${t.connection.port}`);
  } 
  catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;