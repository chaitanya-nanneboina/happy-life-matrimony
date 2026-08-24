import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { updateProfileStatus, deleteProfile } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const profileId = parseInt(id, 10);
  if (isNaN(profileId)) {
    return NextResponse.json(
      { success: false, message: "Invalid profile ID." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { status } = body;

  if (!["verified", "rejected"].includes(status)) {
    return NextResponse.json(
      { success: false, message: "Status must be 'verified' or 'rejected'." },
      { status: 400 }
    );
  }

  updateProfileStatus(profileId, status);

  return NextResponse.json({ success: true, id: profileId, status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const profileId = parseInt(id, 10);
  if (isNaN(profileId)) {
    return NextResponse.json(
      { success: false, message: "Invalid profile ID." },
      { status: 400 }
    );
  }

  deleteProfile(profileId);

  return NextResponse.json({ success: true, message: "Profile deleted permanently." });
}
