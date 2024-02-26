import {
  fetchClubsCollection,
  fetchPlayer,
  fetchPlayersCollection,
} from "@/api/contentful";
import AssetImage from "@/components/AssetImage";
import DetailsList from "@/components/DetailsList";
import Heading from "@/components/Heading";
import RichText from "@/components/RichText";
import { generateTitle } from "@/utils/metadata";
import { differenceInYears } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const player = await fetchPlayer({
    id: params.id,
  });

  if (!player) {
    return notFound();
  }

  const clubsCollection = await fetchClubsCollection();

  const club =
    player.fields.club &&
    clubsCollection.items.find(
      (item) => item.sys.id === player.fields.club?.sys.id
    );

  const formerClubs =
    player.fields.formerClubs &&
    player.fields.formerClubs.map((formerClub) =>
      clubsCollection.items.find((item) => item.sys.id === formerClub.sys.id)
    );

  const age = differenceInYears(new Date(), new Date(player.fields.born));

  const details = [
    { title: "Nationality", details: player.fields.nationality },
    { title: "Born", details: `${player.fields.born} (age ${age} years)` },
    {
      title: "Club",
      details: club ? (
        <>
          <Link href={`/clubs/${club.sys.id}`} className="underline">
            {club.fields.name}
          </Link>
          {player.fields.isCaptain && " (Captain)"}
        </>
      ) : (
        "No current club"
      ),
    },
    { title: "Position", details: player.fields.position },
    {
      title: "Former clubs",
      details:
        formerClubs && formerClubs?.length > 0 ? (
          <ul>
            {formerClubs?.map(
              (formerClub) =>
                formerClub && (
                  <li key={formerClub.sys.id}>
                    <Link
                      href={`/clubs/${formerClub.sys.id}`}
                      className="underline"
                    >
                      {formerClub.fields.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        ) : (
          "No former clubs"
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>{player.fields.name}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 text-sm text-gray-100">
          <RichText document={player.fields.bio} />
          <DetailsList items={details} />
        </div>
        {player.fields.photo && <AssetImage asset={player.fields.photo} />}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const playersCollection = await fetchPlayersCollection();

  return playersCollection.items.map((player) => ({
    id: player.sys.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const player = await fetchPlayer({
    id: params.id,
  });

  if (!player) {
    return notFound();
  }

  return {
    title: generateTitle(player.fields.name),
  };
}
