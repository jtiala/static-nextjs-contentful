import {
  fetchClubsCollection,
  fetchLeague,
  fetchLeaguesCollection,
} from "@/api/contentful";
import DetailsList from "@/components/DetailsList";
import Heading from "@/components/Heading";
import { generateTitle } from "@/utils/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const league = await fetchLeague({
    id: params.id,
  });

  if (!league) {
    return notFound();
  }

  const clubsCollection = await fetchClubsCollection();

  const clubs = clubsCollection.items.filter(
    (item) => item.fields.league.sys.id === league.sys.id
  );

  const details = [
    {
      title: "Country",
      details: league.fields.country,
    },
    {
      title: "Clubs",
      details:
        clubs && clubs?.length > 0 ? (
          <ul>
            {clubs?.map(
              (club) =>
                club && (
                  <li key={club.sys.id}>
                    <Link href={`/clubs/${club.sys.id}`} className="underline">
                      {club.fields.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        ) : (
          "No clubs"
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>{league.fields.name}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 text-sm text-gray-100">
          <DetailsList items={details} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const leaguesCollection = await fetchLeaguesCollection();

  return leaguesCollection.items.map((league) => ({
    id: league.sys.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const league = await fetchLeague({
    id: params.id,
  });

  if (!league) {
    return notFound();
  }

  return {
    title: generateTitle(league.fields.name),
  };
}
