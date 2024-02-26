import {
  fetchClubsCollection,
  fetchPlayersCollection,
  fetchPlayersCount,
} from "@/api/contentful";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { generateTitle } from "@/utils/metadata";
import { Metadata } from "next";
import PlayersList from "../../PlayersList";
import { itemsPerPage } from "../../constants";

interface Props {
  params: {
    page: string;
  };
}

export default async function Page({ params }: Props) {
  const playersCount = await fetchPlayersCount();

  const totalPages = Math.ceil(playersCount / itemsPerPage);

  const playersCollection = await fetchPlayersCollection({
    skip: (parseInt(params.page) - 1) * itemsPerPage,
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
        currentPage={parseInt(params.page)}
        generateLink={(page) => `/players/page/${page}`}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const playersCount = await fetchPlayersCount();

  const totalPages = Math.ceil(playersCount / itemsPerPage);

  const pageNubmers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return pageNubmers.map((pageNumber) => ({
    page: pageNumber.toString(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: generateTitle(`Players - Page ${params.page}`),
  };
}
