import { Hero, Work, Experience, Skills, Contact } from "@/components/sections";
import { Nav, Footer } from "@/components";
import { portfolio } from "@/data/olafenwa";

export default function Home() {
  return (
    <>
      <Nav name={portfolio.name} />
      <main className="mx-auto max-w-[760px] px-7">
        <Hero data={{
          name: portfolio.name,
          role: portfolio.role,
          bio: portfolio.bio,
          availableForWork: portfolio.availableForWork,
          social: portfolio.social,
        }} />
        <Work projects={portfolio.projects} />
        <Experience experience={portfolio.experience} />
        <Skills skills={portfolio.skills} />
        <Contact email={portfolio.email} />
        <Footer name={portfolio.name} />
      </main>
    </>
  );
}