
import { NextResponse } from "next/server";
import WorkOS from "@workos-inc/node";
import { getClientId, workos } from "@/app/auth/auth";

export async function GET() {
  try {
    const redirectUri = process.env.WORKOS_REDIRECT_URI;

    if (!redirectUri) {
      throw new Error("WORKOS_REDIRECT_URI is not set");
    }
  
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: "authkit",
      clientId: getClientId(),
      redirectUri,
    });
  
    
    return NextResponse.json(authorizationUrl); 
  } catch (error) {
    console.error('Error fetching authorization URL:', error);
    return NextResponse.json('Error fetching authorization URL:', error); 
  }
}