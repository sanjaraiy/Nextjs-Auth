import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/user.Model'
import {NextRequest, NextResponse} from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest){
    try {
        //extract  data  from token
       const userId = await getDataFromToken(request); 

      const user = User.findOne({_id: userId}).select("-password");
      
      if(!user){
         return NextResponse.json({error: "Invalid token"}, {status: 400});
      }

      return NextResponse.json({
        message: "User found",
        data: user,
      })
      

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

