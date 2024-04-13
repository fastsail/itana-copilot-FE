import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey, workos, getClientId } from "../auth/auth";

/**
|--------------------------------------------------
| Call back route
|--------------------------------------------------
| some details
*/
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (code) {
    try {
      //-- code returned is used to authenticate the user with WorkOS --//
      const { user } = await workos.userManagement.authenticateWithCode({
        clientId: getClientId(),
        code,
      });

      //-- we can retrieve user info from db here --//

      //-- create JWT token with the user's information --//
      const token = await new SignJWT({user})
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(getJwtSecretKey());

      const url = request.nextUrl.clone();

      //-- Cleanup params --//
      url.searchParams.delete("code");

      //-- Redirect to the requested path and store the session --//
      url.pathname = "/dashboard/current-consultation";
      const response = NextResponse.redirect(url);

      response.cookies.set({
        name: "token",
        value: token,
        path: "/",
        httpOnly: true,
      });

      return response;
    } catch (error) {
      return NextResponse.json(error);
    }
  }

  return NextResponse.json({
    error: "No authorization code was received from AuthKit",
  });
}
