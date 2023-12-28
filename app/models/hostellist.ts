import mongoose, {Schema} from "mongoose";


const hostelListSchema = new Schema(
 {
    title: String,
    description: String,
    gender: String,
    imgSrc: String,
 },
 {
    timestamps: true,
 });

 const Hostellist = mongoose.models.Hostellist || mongoose.model("Hostellist", hostelListSchema);
 
 export default Hostellist; 

