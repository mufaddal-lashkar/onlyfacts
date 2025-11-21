import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/db";
import Message from "@/lib/models/Message";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
    try {
        const { username, content } = await req.json();

        if (!username || !content) {
            return NextResponse.json(
                { error: "Username and content are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.isAcceptingMessages) {
            return NextResponse.json(
                { error: "User is not accepting messages" },
                { status: 403 }
            );
        }

        const newMessage = await Message.create({
            content,
            recipientId: user.clerkId,
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: "Message sent successfully", data: newMessage },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const messages = await Message.find({ recipientId: userId }).sort({
            createdAt: -1,
        });

        return NextResponse.json({ messages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
