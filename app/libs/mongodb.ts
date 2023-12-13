import mongoose from "mongoose"

const connectDB = async () => {

    try {
        const mongodbUri = process.env.DB_URI;

        if(!mongodbUri){
          throw new Error('DB_URI is not in the environment variables');
        }

       if(mongoose.connection.readyState === 0){
        await mongoose.connect(mongodbUri);
        console.log('db connected');
       }
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;