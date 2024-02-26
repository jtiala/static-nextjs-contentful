import {
  fetchClubsCollection,
  fetchPlayersCollection,
  fetchPlayersCount,
} from "@/api/contentful";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { generateTitle } from "@/utils/metadata";
import { Metadata } from "next";
import PlayersList from "./PlayersList";
import { itemsPerPage } from "./constants";

export default async function Page() {
  const playersCount = await fetchPlayersCount();

  const totalPages = Math.ceil(playersCount / itemsPerPage);

  const playersCollection = await fetchPlayersCollection({
    skip: 0,
    limit: itemsPerPage,
  });

  const clubsCollection = await fetchClubsCollection();

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>Players</Heading>
      <PlayersList
        playersCollection={playersCollection}
        clubsCollection={clubsCollection}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        generateLink={(page) => `/players/page/${page}`}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: generateTitle("Players - Page 1"),
};
