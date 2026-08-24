import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminUser } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limit login attempts
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { allowed } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000); // 5 per 15 min
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many login attempts. Please wait." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const admin = await getAdminUser(username);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      );
    }

    const token = await createSessionToken({ username: admin.username, id: admin.id });

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Auth Login Error]", error);
    return NextResponse.json(
      { success: false, message: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
