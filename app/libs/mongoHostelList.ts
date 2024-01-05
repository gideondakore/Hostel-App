import mongoose from "mongoose";

const connectHostelList = () => {

    // try {
    //     const mongodbUri = process.env.DB_HOSTELlIST;

    //     if(!mongodbUri){
    //         throw new Error("DB_HOSTELlIST is not in the environment variable")
    //     }

    //     console.log('BEFORE************************');
    //     console.log(mongoose.connection.readyState);
    //     if(mongoose.connection.readyState === 0){
    //         const connection = await mongoose.connect(mongodbUri);
    //         console.log("BETWEEN**********************");
    //     console.log(`Connected to database: ${connection.connection.db.databaseName}`);
    //     }
    //     console.log("AFTER************************************");
    // } catch (error: any) {
    //     console.log(error);
    //     throw new Error(error)
    // }
    
    try {
         const mongodbUri = process.env.DB_HOSTELlIST;
     
          if(!mongodbUri){
             throw new Error("DB_HOSTELlIST is not in the environment variable")
          }
          const conn = mongoose.createConnection(mongodbUri);
          return {conn};
          
     } catch (error) {
        throw new Error(`Error:${error}`);
     }
}
export default connectHostelList;