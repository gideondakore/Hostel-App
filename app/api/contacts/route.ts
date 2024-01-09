import Contact from "@/app/models/contact";
import checkPasswordValidity from "@/app/libs/checkPasswordValidity";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
      const body = await request.json();
      const userEmailOrPhone = body.email ?? body.phone;
      const userPassword = body.password;

      const keysArr = Object.keys(body)
      const emailOrPhone = keysArr[1];

      const validEmailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      const validPhoneRegex = /^(?:[+]?[2][3][3]|0)?[1-9]\d{8}$/;
      let validatedCredentials:string[] = [];

      if(userPassword){
        validatedCredentials.push(...checkPasswordValidity(userPassword));
        }else{
            validatedCredentials.push("Valid password must be provided");
        }

      if(userEmailOrPhone){
        if(!(validEmailRegex.test(userEmailOrPhone) || validPhoneRegex.test(userEmailOrPhone))){
            validatedCredentials.unshift("Invalid email or phone");

        }
      }else{
        validatedCredentials.unshift("Valid email or phone number must be provided");
      }
        
      if(Array.isArray(validatedCredentials) && (validatedCredentials.length === 0)){

          const res = await fetch(`http://localhost:3000/api/contacts?${emailOrPhone}=${userEmailOrPhone}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          if(!res.ok){
            return NextResponse.json({message: ["Ooops! something went wrong, try again later"], success: false}, {status: 500});
          }

          const {message, success} = await res.json();
          if(!success){
            return NextResponse.json({message: message, success: false}, {status: 201});
          }

          await Contact.create(body);
          return NextResponse.json({message: ["Account created successfully"], success: true}, {status: 200});
      }
        return NextResponse.json({message: validatedCredentials, success: false}, {status: 500});

    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
            let errorList: string[] = [];
            for(let e in error.errors){
                errorList.push((error.errors[e].message));
            }
            return NextResponse.json({message: errorList}, {status: 500});
        }else{
            return NextResponse.json({message: ["Unable to send request"]}, {status: 500});
        }
    }
}

export async function GET(request: NextRequest, response: NextResponse){
    const {searchParams} = new URL(request.url);
    const userEmailOrPhone = searchParams.get('email') ?? searchParams.get('phone');
    
    const keysIterator = searchParams.keys();
    const firstKey = keysIterator.next().value;
    
    const user = await Contact.findOne({
        $or: [
            {email: userEmailOrPhone},
            {phone: userEmailOrPhone},
        ]
    })

    if(user){
        return NextResponse.json({message: `User with the same ${firstKey}: '${userEmailOrPhone}' exist`, success: false}, {status: 201})
    }
      return NextResponse.json({message: "User not found", success: true}, {status: 200});
}


