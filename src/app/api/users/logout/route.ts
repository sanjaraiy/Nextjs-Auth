import {connect} from "@/dbConfig/dbConfig"
import {NextRequest, NextResponse} from 'next/server';

connect()

export async function GET(request: NextRequest){
    try {
         // nextresponse type this variable so we can access cookie
       const response = NextResponse.json({
            success: true,
            message: "Logout Successfully!",
        }, {status: 200});
        
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}