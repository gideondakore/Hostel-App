import connectHostelList from "@/app/libs/mongoHostelList";
import Hostellist from "@/app/models/hostellist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {id: string}}){
    try {
        const {id} = params;
        await connectHostelList();
        const hostelList = await Hostellist.findOne({_id: id});
        return NextResponse.json({hostelList}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Unable to fetch data for hostel`}, {status: 404});
    }
}