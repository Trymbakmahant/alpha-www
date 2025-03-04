import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Navbar from "@/components/Navigation/Navbar";
export default function Home() {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col">
        <Hero />
        {/* <Projects /> */}
      </div>
    </main>
  );
}
