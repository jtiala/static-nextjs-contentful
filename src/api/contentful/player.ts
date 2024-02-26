import { TypePlayerSkeleton, isTypePlayer } from "@/generated/contentful";
import contentfulClient from "./lib/contentfulClient";

export async function fetchPlayersCount() {
  const contentful = contentfulClient();

  const collection = await contentful.getEntries<TypePlayerSkeleton>({
    content_type: "player",
  });

  return collection.total;
}

interface FetchPlayersOptions {
  skip?: number;
  limit?: number;
}

export async function fetchPlayersCollection(options?: FetchPlayersOptions) {
  const contentful = contentfulClient();

  return await contentful.getEntries<TypePlayerSkeleton>({
    content_type: "player",
    skip: options?.skip || 0,
    limit: options?.limit || 1000,
    order: ["fields.name"],
  });
}

interface FetchPlayerOptions {
  id: string;
}

export async function fetchPlayer(options: FetchPlayerOptions) {
  const contentful = contentfulClient();

  const entry = await contentful.getEntry(options.id);

  if (!isTypePlayer(entry)) {
    throw new Error("Player not found");
  }

  return entry;
}
