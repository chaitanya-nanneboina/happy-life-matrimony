import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getProfiles } from "@/lib/db";

export async function GET(request: NextRequest) {
  // Verify admin session
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const gender = searchParams.get("gender") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const result = getProfiles({ search, gender, status, page, limit });

  return NextResponse.json({ success: true, ...result });
}
