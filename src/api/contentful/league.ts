import { TypeLeagueSkeleton, isTypeLeague } from "@/generated/contentful";
import contentfulClient from "./lib/contentfulClient";

export async function fetchLeaguesCount() {
  const contentful = contentfulClient();

  const collection = await contentful.getEntries<TypeLeagueSkeleton>({
    content_type: "league",
  });

  return collection.total;
}

interface FetchLeaguesOptions {
  skip?: number;
  limit?: number;
}

export async function fetchLeaguesCollection(options?: FetchLeaguesOptions) {
  const contentful = contentfulClient();

  return await contentful.getEntries<TypeLeagueSkeleton>({
    content_type: "league",
    skip: options?.skip || 0,
    limit: options?.limit || 1000,
    order: ["fields.name"],
  });
}

interface FetchLeagueOptions {
  id: string;
}

export async function fetchLeague(options: FetchLeagueOptions) {
  const contentful = contentfulClient();

  const entry = await contentful.getEntry(options.id);

  if (!isTypeLeague(entry)) {
    throw new Error("League not found");
  }

  return entry;
}
