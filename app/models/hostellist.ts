import mongoose, {Schema} from "mongoose";
import connectHostelList from "../libs/mongoHostelList";

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

 const {conn} = connectHostelList();
 const Hostellist = conn.models.Hostellist || conn.model("Hostellist", hostelListSchema);
 
 export default Hostellist; 

