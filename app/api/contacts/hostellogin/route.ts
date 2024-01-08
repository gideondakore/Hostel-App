import Contact from "@/app/models/contact";
import checkPasswordValidity from "@/app/libs/checkPasswordValidity";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, response: NextResponse) {
  try {
      const {searchParams} = new URL(request.url);
      const userEmailOrPhone = searchParams.get('email') ?? searchParams.get('phone');
      const userPassword = searchParams.get('password');

      const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
      let validatePassword:string[] = [];

      if(userPassword){
         validatePassword = checkPasswordValidity(userPassword);
      }else{
        return NextResponse.json({user: null, message: validatePassword.join('\n'), success: false}, {status: 500});
      }

      if(userEmailOrPhone){
        if((validEmailRegex.test(userEmailOrPhone) || validPhoneRegex.test(userEmailOrPhone)) && (Array.isArray(validatePassword) && validatePassword.length === 0)){
          const user = await Contact.findOne({
            $or: [
                {email: userEmailOrPhone},
                {phone: userEmailOrPhone}
            ]
          });
          return NextResponse.json({user, message: "successfully", success: true}, {status: 200});
        }
          return NextResponse.json({user: null, message: "Invalid email or phone", success: false}, {status: 500});
      }
        return NextResponse.json({user: null, message: "Wrong input provided", success: false}, {status: 500});
        
  } catch (error) {
      return NextResponse.json({error: error, success: false}, {status: 500});
  }
    
}