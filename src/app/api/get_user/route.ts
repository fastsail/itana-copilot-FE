import { verifyJwtToken } from "@/app/auth/auth";
import { User } from "@workos-inc/node";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
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
  }
}
