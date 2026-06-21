import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json({ authenticated: false, error: "Not authenticated" }, { status: 200 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "super_secret_jwt_key_career_gps_12345");
    const { payload } = await jwtVerify(token, secret);

    await connectToDatabase();
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Invalid token" }, { status: 200 });
  }
}
