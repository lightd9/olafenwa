import { Tag, SectionHeader } from "@/components/ui";

interface SkillsProps {
  skills: string[];
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section className="mb-20">
      <SectionHeader title="Stack" />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Tag key={skill} label={skill} />
        ))}
      </div>
    </section>
  );
}