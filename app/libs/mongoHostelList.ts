import mongoose from "mongoose";

const connectHostelList = () => {
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