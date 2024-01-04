import connectHostelList from "@/app/libs/mongoHostelList";
import Hostellist from "@/app/models/hostellist";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest){
    try {
        const {title, description, gender, imgSrc} = await req.json();
        await connectHostelList();
        await Hostellist.create({title, description, gender, imgSrc});
        return NextResponse.json({message: "Hostel added successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({error: "Failed to add hostel"}, {status: 404});
    }
}

export async function GET(req: NextRequest){
    try {
        await connectHostelList();
        const hostelLists = await Hostellist.find();
        console.log(hostelLists);
        return NextResponse.json({hostelLists}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Unable to fetch hostel list data"}, {status: 404})
    }
}