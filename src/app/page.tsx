import { Blog7 } from "@/components/blog7";
import { Footer2 } from "@/components/footer2";
import { Hero7 } from "@/components/hero7";
import StatsCard from "@/components/stats-card10";

export default function Home() {
  return (
    <div>
      <Hero7></Hero7>
      <StatsCard></StatsCard>
      <Blog7 tagline={"hi"} heading={"hello"} description={""} buttonText={""} buttonUrl={""} posts={[]}></Blog7>
      <Footer2></Footer2>
    </div>
  );
}
