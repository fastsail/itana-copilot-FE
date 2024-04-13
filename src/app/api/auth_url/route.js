
import { NextResponse } from "next/server";
import WorkOS, { User } from "@workos-inc/node";
import { getClientId } from "@/app/auth/auth";

export const workos = new WorkOS(process.env.WORKOS_API_KEY);

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
  }
}