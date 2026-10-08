import { MotionConfig } from "framer-motion";
import { Hero, Work, Experience, Skills, Contact } from "@/components/sections";
import { Nav, Sidebar, Footer } from "@/components";
import { Reveal } from "@/components/Reveal";
import { portfolio } from "@/data/olafenwa";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav name={portfolio.name} />
      <Sidebar
        name={portfolio.name}
        social={portfolio.social}
        availableForWork={portfolio.availableForWork}
      />
      <div className="sidebar-pad">
        <main id="main" className="mx-auto max-w-[760px] px-7">
          <Hero
            data={portfolio}
            workHref={
              portfolio.projects[0]
                ? `/work/${portfolio.projects[0].slug}`
                : "#work"
            }
          />
          <Reveal>
            <Work projects={portfolio.projects} />
          </Reveal>
          <Reveal>
            <Experience experience={portfolio.experience} />
          </Reveal>
          <Reveal>
            <Skills skills={portfolio.skills} />
          </Reveal>
          <Reveal>
            <Contact email={portfolio.email} twitter={portfolio.twitter} />
          </Reveal>
          <Footer name={portfolio.name} />
        </main>
      </div>
    </MotionConfig>
  );
}
