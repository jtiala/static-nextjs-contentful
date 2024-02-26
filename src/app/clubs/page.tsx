import { fetchClubsCollection, fetchLeaguesCollection } from "@/api/contentful";
import Heading from "@/components/Heading";
import { generateTitle } from "@/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";

export default async function Page() {
  const clubsCollection = await fetchClubsCollection();
  const leaguesCollection = await fetchLeaguesCollection();

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>Clubs</Heading>
      <ul>
        {clubsCollection.items.map((club) => {
          const league = leaguesCollection.items.find(
            (item) => item.sys.id === club.fields.league.sys.id
          );

          const details = [
            `${club.fields.city}, ${club.fields.country}`,
            ...(league ? [league.fields.name] : []),
          ];

          return (
            <li key={club.sys.id}>
              <Link
                href={`/clubs/${club.sys.id}`}
                className="flex flex-col group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
              >
                {club.fields.name}
                <span className="m-0 text-sm opacity-50">
                  {details.join(" | ")}
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
  title: generateTitle("Clubs"),
};
