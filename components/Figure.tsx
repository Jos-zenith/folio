import Image from "next/image";
import type { Project } from "@/lib/data";
import MuleGraph from "./MuleGraph";
import OfflineDemo from "./OfflineDemo";
import CompSlider from "./CompSlider";
import Pipeline from "./Pipeline";

const captions: Record<string, string> = {
  parkintoday: "The ParkinToday mark: a P that is also a pin.",
  "mars-rover": "Sealed body, first CAD pass.",
};

/** Returns the interactive or photographic exhibit for a project, or null if it has none. */
export default function Figure({ project }: { project: Project }) {
  switch (project.slug) {
    case "operation-nolambur":
      return <MuleGraph />;
    case "uzhavan":
      return <OfflineDemo />;
    case "compintel":
      return <CompSlider />;
    case "sovereign-faas":
      return <Pipeline />;
  }
  if (project.image) {
    return (
      <figure className="fig fig-photo taped" style={{ margin: 0 }}>
        <Image src={project.image} alt={project.imageAlt ?? project.title} width={1080} height={864} sizes="(max-width: 920px) 100vw, 600px" />
        <figcaption>{captions[project.slug] ?? project.tagline}</figcaption>
      </figure>
    );
  }
  return null;
}
