import { About } from "@/components/About";
import { Backdrop } from "@/components/Backdrop";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Backdrop />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Work />
          <About />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
