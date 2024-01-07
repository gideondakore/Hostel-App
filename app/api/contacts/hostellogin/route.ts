import Contact from "@/app/models/contact";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, response: NextResponse) {
  try {
       

      const input = request.nextUrl.searchParams.get("input");
      console.log("INPUT::::::::::::",input);
        const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
        if(input){
           if(validEmailRegex.test(input) || validPhoneRegex.test(input)){
            const user = await Contact.findOne({
              $or: [
                  {email: input},
                  {phone: input}
              ]
            });
            return NextResponse.json({user, message: "successfully", success: true}, {status: 200});
           }
            return NextResponse.json({user: null, message: "Invalid email or phone", success: false}, {status: 500});
        }
        return NextResponse.json({user: null, message: "No input provided", success: false}, {status: 500});
        
  } catch (error) {
      return NextResponse.json({error: error, success: false}, {status: 500});
  }
    
}