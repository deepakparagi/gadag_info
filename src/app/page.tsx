import Hero from "@/components/ui/Hero";
import CultureGrid from "@/components/ui/CultureGrid";
import InstagramGrid from "@/components/ui/InstagramGrid";
import { FeaturedStory } from "@/components/ui/FeaturedStory";
import BentoExperience from "@/components/ui/BentoExperience";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedStory />
      <CultureGrid />
      <BentoExperience />
      <InstagramGrid />
    </>
  );
}
