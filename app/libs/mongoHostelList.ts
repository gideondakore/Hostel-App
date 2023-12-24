import mongoose from "mongoose";

const connectHostelList = async () => {

    try {
        const mongodbUri = process.env.DB_HOSTELlIST;

        if(!mongodbUri){
            throw new Error("DB_HOSTELlIST is not in the environment variable")
        }

        if(mongoose.connection.readyState === 0){
            await mongoose.connect(mongodbUri);
            console.log("Hostel list connected");
        }
    } catch (error) {
        console.log(error);
    }
}
export default connectHostelList;