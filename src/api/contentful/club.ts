import { TypeClubSkeleton, isTypeClub } from "@/generated/contentful";
import contentfulClient from "./lib/contentfulClient";

export async function fetchClubsCount() {
  const contentful = contentfulClient();

  const collection = await contentful.getEntries<TypeClubSkeleton>({
    content_type: "club",
  });

  return collection.total;
}

interface FetchClubsOptions {
  skip?: number;
  limit?: number;
}

export async function fetchClubsCollection(options?: FetchClubsOptions) {
  const contentful = contentfulClient();

  return await contentful.getEntries<TypeClubSkeleton>({
    content_type: "club",
    skip: options?.skip || 0,
    limit: options?.limit || 1000,
    order: ["fields.name"],
  });
}

interface FetchClubOptions {
  id: string;
}

export async function fetchClub(options: FetchClubOptions) {
  const contentful = contentfulClient();

  const entry = await contentful.getEntry(options.id);

  if (!isTypeClub(entry)) {
    throw new Error("Club not found");
  }

  return entry;
}
