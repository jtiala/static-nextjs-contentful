import { fetchLeaguesCollection } from "@/api/contentful";
import Heading from "@/components/Heading";
import { generateTitle } from "@/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export default async function Page() {
  const leaguesCollection = await fetchLeaguesCollection();

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>Leagues</Heading>
      <ul>
        {leaguesCollection.items.map((league) => {
          return (
            <li key={league.sys.id}>
              <Link
                href={`/leagues/${league.sys.id}`}
                className="flex flex-col group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
              >
                {league.fields.name}
                <span className="m-0 text-sm opacity-50">
                  {league.fields.country}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: generateTitle("Leagues"),
};
