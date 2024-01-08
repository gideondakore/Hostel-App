import mongoose from "mongoose"

const connectDB = () => {
    try {
      const mongodbUri = process.env.DB_URI;

        if(!mongodbUri){
          throw new Error('DB_URI is not in the environment variables');
        }
        
    const conn = mongoose.createConnection(mongodbUri);
    return {conn};
    } catch (error) {
      throw new Error(`Error:${error}`)
    }

    
}

export default connectDB;