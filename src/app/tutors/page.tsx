import StatsCard from "@/components/stats-card10";

export const dynamic = "force-dynamic";

export default async function TutorsPage() {
        await new Promise((resolve) => setTimeout(resolve, 1000))

    return (
        <div>
            <StatsCard></StatsCard>
        </div>
    )
}