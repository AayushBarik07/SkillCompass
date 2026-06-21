import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Please fill all fields" }, { status: 200 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already registered" }, { status: 200 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const tokenData = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET || "super_secret_jwt_key_career_gps_12345", {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
    }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 86400, // 1 day
    });

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
