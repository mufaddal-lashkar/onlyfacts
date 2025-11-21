import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
            <SignUp
                forceRedirectUrl="/dashboard"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-[#1a1a1a] border border-gray-800",
                        headerTitle: "text-white",
                        headerSubtitle: "text-gray-400",
                        socialButtonsBlockButton: "text-white border-gray-700 hover:bg-[#252525]",
                        formFieldLabel: "text-gray-300",
                        formFieldInput: "bg-[#0f0f0f] border-gray-700 text-white",
                        footerActionText: "text-gray-400",
                        footerActionLink: "text-[#ff4d6d] hover:text-[#ff7a9e]",
                    }
                }}
            />
        </div>
    );
}

