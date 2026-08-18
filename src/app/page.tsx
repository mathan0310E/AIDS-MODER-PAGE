import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyAI } from "@/components/WhyAI";
import { Curriculum } from "@/components/Curriculum";
import { Labs } from "@/components/Labs";
import { Projects } from "@/components/Projects";
import { Careers } from "@/components/Careers";
import { Resources, TechMarquee } from "@/components/Resources";
import { News } from "@/components/News";
import { Faculty } from "@/components/Faculty";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechMarquee />
      <WhyAI />
      <Curriculum />
      <Labs />
      <Projects />
      <Careers />
      <Resources />
      <News />
      <Faculty />
      <FAQ />
      <Contact />
    </>
  );
}
