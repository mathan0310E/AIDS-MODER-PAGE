import { Hero } from "@/components/Hero";
import { Platform } from "@/components/Platform";
import { Solutions } from "@/components/Solutions";
import { Process } from "@/components/Process";
import { Showcase } from "@/components/Showcase";
import { Team } from "@/components/Team";
import { CTA, TechMarquee } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Platform />
      <Solutions />
      <Process />
      <Showcase />
      <Team />
      <CTA />
    </>
  );
}
