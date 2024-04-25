import { verifyJwtToken } from "@/app/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@workos-inc/node";


export async function GET(req: NextRequest) {
    try {
      const { cookies } = req;
      const { value: token } = cookies.get("token") ?? { value: null };

      //-- Verify the token --//
      const verifiedToken = token && (await verifyJwtToken(token));
    
      if (verifiedToken) {
        return NextResponse.json({
          isAuthenticated: true,
          user: verifiedToken.user as User | null,
        });
      }
  
      return NextResponse.json({ isAuthenticated: false }); 
    } catch (error) {
      console.error('Error fetching authorization URL:', error);
      return NextResponse.json({ message: "Error occurred", error }, { status: 500 });
    }
  }
  
 export const dynamic = 'force-dynamic'
 