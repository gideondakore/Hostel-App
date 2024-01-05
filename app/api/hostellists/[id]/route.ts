import Hostellist from "@/app/models/hostellist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}:{params: {id: string}}){
    try {
        const {id} = params;
        const hostelList = await Hostellist.findOne({_id: id});
        return NextResponse.json({hostelList}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: `Unable to fetch data for hostel`}, {status: 404});
    }
}

export async function PUT(req: NextRequest, {params}:{params: {id: string}}){
    try {
        const {id} = params;
        const {newTitle: title, newDescription: description, newGender: gender, newImgSrc: imgSrc} = await req.json()
        await Hostellist.findByIdAndUpdate(id, {title, description, gender, imgSrc});
        return NextResponse.json({message: `${title} hostel updated successfully`}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: error}, {status: 404});
    }
}
