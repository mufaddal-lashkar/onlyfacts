import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        const clerkUser = await currentUser();

        if (!userId || !clerkUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            // If user doesn't exist in MongoDB (e.g. webhook failed or local dev), create them now
            const email = clerkUser.emailAddresses[0].emailAddress;
            // Use username from Clerk or fallback to email prefix
            let username = clerkUser.username || email.split("@")[0];

            // Ensure username is unique by appending random string if needed
            // For simplicity in this fallback, we'll just try to create it. 
            // If it fails due to duplicate username, we might need a retry logic or just let the user change it later.
            // But let's try to make it unique if possible.

            // Check if username taken
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                username = `${username}_${Math.floor(Math.random() * 1000)}`;
            }

            user = await User.create({
                clerkId: userId,
                username: username,
                email: email,
                isAcceptingMessages: true,
            });
        }

        return NextResponse.json(
            {
                username: user.username,
                isAcceptingMessages: user.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
