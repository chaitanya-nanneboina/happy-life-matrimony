import { NextRequest, NextResponse } from "next/server";
import { createProfile } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, gender, looking_for, phone, state, district, city } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please enter your full name (at least 2 characters)." },
        { status: 400 }
      );
    }
    if (!["Male", "Female", "Other"].includes(gender)) {
      return NextResponse.json(
        { success: false, message: "Please select a valid gender." },
        { status: 400 }
      );
    }
    if (!["Male", "Female", "Either"].includes(looking_for)) {
      return NextResponse.json(
        { success: false, message: "Please select who you are looking for." },
        { status: 400 }
      );
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid mobile number." },
        { status: 400 }
      );
    }
    if (!state || state.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Please select a state." }, { status: 400 });
    }
    if (!district || district.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Please select a district." }, { status: 400 });
    }
    if (!city || city.trim().length < 2) {
      return NextResponse.json({ success: false, message: "Please enter your city/town." }, { status: 400 });
    }

    const profileId = await createProfile({
      name: name.trim(),
      gender,
      looking_for,
      phone,
      state,
      district,
      city: city.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Profile created successfully. We will review your details soon.",
      data: { id: profileId },
    });
  } catch (error) {
    console.error("[Profile Create Error]", error);
    return NextResponse.json(
      { success: false, message: "Failed to create profile. Please try again." },
      { status: 500 }
    );
  }
}
