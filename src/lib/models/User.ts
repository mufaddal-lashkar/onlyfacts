import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string;
    username: string;
    email: string;
    isAcceptingMessages: boolean;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    clerkId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    isAcceptingMessages: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
