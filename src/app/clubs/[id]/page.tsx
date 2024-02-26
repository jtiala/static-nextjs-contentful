import {
  fetchClub,
  fetchClubsCollection,
  fetchLeaguesCollection,
  fetchManagersCollection,
  fetchPlayersCollection,
} from "@/api/contentful";
import AssetImage from "@/components/AssetImage";
import DetailsList from "@/components/DetailsList";
import Heading from "@/components/Heading";
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
  const club = await fetchClub({
    id: params.id,
  });

  if (!club) {
    return notFound();
  }

  const leaguesCollection = await fetchLeaguesCollection();

  const league = leaguesCollection.items.find(
    (item) => item.sys.id === club.fields.league?.sys.id
  );

  const playersCollection = await fetchPlayersCollection();

  const players = playersCollection.items.filter(
    (item) => item.fields.club?.sys.id === club.sys.id
  );

  const formerPlayers = playersCollection.items.filter((item) =>
    item.fields.formerClubs
      ? item.fields.formerClubs.some((i) => i.sys.id === club.sys.id)
      : false
  );

  const managersCollection = await fetchManagersCollection();

  const managers = managersCollection.items.filter(
    (item) => item.fields.club?.sys.id === club.sys.id
  );

  const formerManagers = managersCollection.items.filter((item) =>
    item.fields.formerClubs
      ? item.fields.formerClubs.some((i) => i.sys.id === club.sys.id)
      : false
  );

  const age = differenceInYears(
    new Date(),
    new Date(`${club.fields.established}-01-01`)
  );

  const details = [
    {
      title: "Location",
      details: `${club.fields.city}, ${club.fields.country}`,
    },
    {
      title: "Established",
      details: `${club.fields.established} (${age} years ago)`,
    },
    {
      title: "Nicknames",
      details: club.fields.nicknames && club.fields.nicknames?.length > 0 && (
        <ul>
          {club.fields.nicknames?.map(
            (nickname) => nickname && <li key={nickname}>{nickname}</li>
          )}
        </ul>
      ),
    },
    {
      title: "League",
      details: league && (
        <Link href={`/leagues/${league.sys.id}`} className="underline">
          {league.fields.name}
        </Link>
      ),
    },
    {
      title: "Players",
      details:
        players.length > 0 ? (
          <ul>
            {players?.map(
              (player) =>
                player && (
                  <li key={player.sys.id}>
                    <Link
                      href={`/players/${player.sys.id}`}
                      className="underline"
                    >
                      {player.fields.name}
                    </Link>
                    {player.fields.isCaptain ? ` (Captain)` : ""}
                  </li>
                )
            )}
          </ul>
        ) : (
          "No players"
        ),
    },
    {
      title: "Managers",
      details:
        managers.length > 0 ? (
          <ul>
            {managers?.map(
              (manager) =>
                manager && (
                  <li key={manager.sys.id}>
                    <Link
                      href={`/managers/${manager.sys.id}`}
                      className="underline"
                    >
                      {manager.fields.name}
                    </Link>{" "}
                    ({manager.fields.role})
                  </li>
                )
            )}
          </ul>
        ) : (
          "No managers"
        ),
    },
    {
      title: "Former players",
      details:
        formerPlayers.length > 0 ? (
          <ul>
            {formerPlayers?.map(
              (player) =>
                player && (
                  <li key={player.sys.id}>
                    <Link
                      href={`/players/${player.sys.id}`}
                      className="underline"
                    >
                      {player.fields.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        ) : (
          "No former players"
        ),
    },
    {
      title: "Former managers",
      details:
        formerManagers.length > 0 ? (
          <ul>
            {formerManagers?.map(
              (manager) =>
                manager && (
                  <li key={manager.sys.id}>
                    <Link
                      href={`/managers/${manager.sys.id}`}
                      className="underline"
                    >
                      {manager.fields.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        ) : (
          "No former managers"
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>{club.fields.name}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 text-sm text-gray-100">
          <DetailsList items={details} />
        </div>
        {club.fields.badge && <AssetImage asset={club.fields.badge} />}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const clubsCollection = await fetchClubsCollection();

  return clubsCollection.items.map((club) => ({
    id: club.sys.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const club = await fetchClub({
    id: params.id,
  });

  if (!club) {
    return notFound();
  }

  return {
    title: generateTitle(club.fields.name),
  };
}
