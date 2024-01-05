import mongoose, { Schema, Document } from "mongoose";
import connectDB from "../libs/mongodb";

interface IContact extends Document {
  name: string;
  email?: string;
  phone?: string;
  gender: string;
  date: string;
}

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be less than 50 characters"],
    },

    email: {
        type: String,
        //TODO: find a correct way of doing it
        validate:{
          validator: function(this: IContact){
            return !this.phone
          },
          message: "Email is required when phone is not provided",
        },

        required: function(this: IContact) {
          return !this.phone
        },
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"],
    },
    
    phone: {
      type: String,
      //TODO: find a correct way of doing it
      validate: {
        validator: function(this: IContact){
          return !this.email
        },
        message: "Phone number is required when email is not provided",
      },
      required: function(this: IContact) {
        return !this.email
      }

    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },

    gender: {
        type: String,
        required: [true, "Gender is required"]
    },

    date: {
        type: Date,
        default: Date.now,
    }
})
const {conn} = connectDB();
const Contact = conn.models.Contact || conn.model("Contact", contactSchema);

export default Contact;