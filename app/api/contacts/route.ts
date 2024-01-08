import Contact from "@/app/models/contact";
import checkPasswordValidity from "@/app/libs/checkPasswordValidity";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    
    try {
      const body = await request.json();
      const userEmailOrPhone = body.email ?? body.phone;
      const userPassword = body.password;

      const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
      let validatedCredentials:string[] = [];

      
      if(userPassword){
        validatedCredentials.push(...checkPasswordValidity(userPassword));
        }else{
            validatedCredentials.push("Valided password must be provided");
        }

      if(userEmailOrPhone){
        if(!(validEmailRegex.test(userEmailOrPhone) || validPhoneRegex.test(userEmailOrPhone))){
            validatedCredentials.unshift("Invalid email or phone");

        }
      }else{
        validatedCredentials.unshift("Valided email or phone number must be provided");
      }
        
      if(Array.isArray(validatedCredentials) && (validatedCredentials.length === 0)){
          await Contact.create(body);
          return NextResponse.json({msg: ["Account created successfully"], success: true}, {status: 200});
        }
        console.log(validatedCredentials.length !== 0);
        return NextResponse.json({msg: validatedCredentials, success: false}, {status: 500});

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



