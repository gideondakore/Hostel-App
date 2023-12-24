import mongoose, {Schema} from "mongoose";

const GenderType = ['Boy', 'Girl', 'Co-Living'];

const hostelListSchema = new Schema(
 {
    title: String,
    description: String,
    gender: {
        type: String,
        enum: GenderType
    }
 },
 {
    timestamps: true,
 });

 const Hostellist = mongoose.models.Hostellist || mongoose.model("Hostellist", hostelListSchema);
 
 export default Hostellist; 

