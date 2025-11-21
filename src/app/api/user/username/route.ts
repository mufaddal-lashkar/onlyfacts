import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function PATCH(req: NextRequest) {
    try {
        const { userId } = await auth();
        const { username } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!username || username.length < 3) {
            return NextResponse.json(
                { error: "Username must be at least 3 characters long" },
                { status: 400 }
            );
        }

        // Basic regex for username validation (alphanumeric, underscores, hyphens)
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (!usernameRegex.test(username)) {
            return NextResponse.json(
                { error: "Username can only contain letters, numbers, underscores, and hyphens" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser.clerkId !== userId) {
            return NextResponse.json(
                { error: "Username is already taken" },
                { status: 409 }
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { username },
            { new: true }
        );

        if (!updatedUser) {
            // If user not found during update, it means they don't exist yet.
            // We could create them here, but the profile route handles creation.
            // Let's return a 404 but with a hint, or just create them.
            // Creating them here requires fetching email etc which is expensive.
            // Let's assume the frontend will hit profile first.
            // But to be safe, let's return a specific error code so frontend can reload profile?
            // Or just return 404.
            return NextResponse.json({ error: "User not found. Please refresh the page." }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: "Username updated successfully",
                username: updatedUser.username,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating username:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
