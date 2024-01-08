import Contact from "@/app/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, response: NextResponse) {
  try {
      const {searchParams} = new URL(request.url);
      const userEmailOrPhone = searchParams.get('email') ?? searchParams.get('phone');
      const userPassword = searchParams.get('password');

      const user = await Contact.findOne({
        $or: [
          {email: userEmailOrPhone},
          {phone: userEmailOrPhone}
        ],
        $and: [
          {password: userPassword}
        ]
        });

      if(user)
       return NextResponse.json({user, message: "successfully", success: true}, {status: 200});
      else
       return NextResponse.json({user, message: "user not found", success: false}, {status: 201});
        
  } catch (error) {
      return NextResponse.json({error: error, success: false}, {status: 500});
  }
    
}