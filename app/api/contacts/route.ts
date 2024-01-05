// import connectDB from "@/app/libs/mongodb";
import Contact from "@/app/models/contact";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    
    try {
        const body = await req.json();
        // await connectDB();
        await Contact.create(body);
        return NextResponse.json({
            msg: ["Message sent successfully"],
            success: true,
        })
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            let errorList: string[] = [];
            for(let e in error.errors){
                errorList.push((error.errors[e].message));
            }
            return NextResponse.json({msg: errorList});
        }else{
            return NextResponse.json({msg: ["Unable to send message"]});
        }
    }
}



