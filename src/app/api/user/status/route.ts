import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function PATCH(req: NextRequest) {
    try {
        const { userId } = await auth();
        const { isAcceptingMessages } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { isAcceptingMessages },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: "Status updated successfully",
                isAcceptingMessages: updatedUser.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
