import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white relative selection:bg-[#ff4d6d] selection:text-white">
            <Navbar />
            <Hero />
        </main>
    );
}
