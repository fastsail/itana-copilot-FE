import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        cookies().delete("token");
        return NextResponse.json({success: true}); 
    } catch (error) {
        console.error('Error logging out:', error);
        return NextResponse.json({ success: false});
    }
}

export const dynamic = 'force-dynamic'