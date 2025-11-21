import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    content: string;
    recipientId: string; // Clerk ID of the recipient
    createdAt: Date;
    ipHash?: string;
}

const MessageSchema: Schema = new Schema({
    content: { type: String, required: true },
    recipientId: { type: String, required: true, index: true },
    createdAt: { type: Date, default: Date.now },
    ipHash: { type: String },
});

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
