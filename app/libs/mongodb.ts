import mongoose from "mongoose"
//import Contact from "../models/contact";

const connectDB = () => {

    // try {
    //     const mongodbUri = process.env.DB_URI;

    //     if(!mongodbUri){
    //       throw new Error('DB_URI is not in the environment variables');
    //     }

    //    if(mongoose.connection.readyState === 0){
    //     const connection =  await mongoose.connect(mongodbUri);
    //     // console.log('db connected');
    //     console.log(`Connected to database: ${connection.connection.db.databaseName}`);
    //    }
    // } catch (error) {
    //     console.log(error);
    // }

    try {
      const mongodbUri = process.env.DB_URI;

        if(!mongodbUri){
          throw new Error('DB_URI is not in the environment variables');
        }
        
    const conn = mongoose.createConnection(mongodbUri);
    // const Model = conn.model('Contact');
    return {conn};
    } catch (error) {
      throw new Error(`Error:${error}`)
    }

    
}

export default connectDB;