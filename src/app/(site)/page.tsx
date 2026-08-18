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
import { Activities } from "@/components/Activities";
import { Achievements } from "@/components/Achievements";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Alumni } from "@/components/Alumni";
import { Downloads } from "@/components/Downloads";
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
      <Activities />
      <Achievements />
      <Events />
      <Careers />
      <Resources />
      <News />
      <Faculty />
      <Alumni />
      <Gallery />
      <Downloads />
      <FAQ />
      <Contact />
    </>
  );
}
