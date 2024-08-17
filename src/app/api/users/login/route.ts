import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/user.Model'
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
     try {
           const reqBody = await request.json();
           const {email, password} = reqBody;
           //validation
           console.log(reqBody);

          const user = await User.findOne({email});

           if(!user){
            return NextResponse.json({error: "email is not registered"}, {status: 400});
           }

           console.log("User exists");
        
           const userPassword = user.password;
           const isPassword = await bcryptjs.compare(password, userPassword);

           if(!isPassword){
             return NextResponse.json({error: "email or password is not valid, please enter valid credentials"}, {status: 400});
           }

           const tokenData = {
              id: user._id,
              username: user.username,
              email: user.email
           }

           const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'});
         
           const response = NextResponse.json({
            success: true,
            message:"user is successfully login!", 

         }, {status: 200});

         response.cookies.set("token", token, {
            httpOnly: true // at backend site is possible to manipulate, frontend side only read
         })
           
         return response;

           
     } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
     }
}
