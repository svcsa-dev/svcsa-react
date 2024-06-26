import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { asyncFetch } from "@/utils/fetch";
import TeamRankTable from "@/components/basketball/standing/TeamRankTable";
import Custom404 from "@/components/404";

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-static';
export default async function Page({
  params,
}: {
  params: { competition: string };
}) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);

  if(!season) {
    return (
      <Custom404 />
    )
  }
  // fetch team rank
  const teamRank = await asyncFetch(
    `/basketball/teamrank?seasonid=${season.id}`
  );
  return (
    <section>
      <h1>{season.name}</h1>
      <TeamRankTable teamRank={teamRank} />
    </section>
  );
}

export async function generateStaticParams() {
  return [
    { competition: "men-open" },
    { competition: "women-open" },
    { competition: "men-senior" },
  ];
}
