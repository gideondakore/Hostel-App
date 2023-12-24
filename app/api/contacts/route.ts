import connectHostelList from "@/app/libs/mongoHostelList";
import connectDB from "@/app/libs/mongodb";
import Contact from "@/app/models/contact";
import Hostellist from "@/app/models/hostellist";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    
    try {
        const body = await req.json();
        await connectDB();
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
            // console.log(errorList);
            return NextResponse.json({msg: errorList});
        }else{
            return NextResponse.json({msg: ["Unable to send message"]});
        }
    }
}

export async function GET(req: NextRequest){
    try {
        await connectHostelList();
        const hostelLists = Hostellist.find();
        return NextResponse.json({hostelLists});
    } catch (error) {
        return NextResponse.json({error: "Unable to fetch hostel list data"}, {status: 404})
    }
}

