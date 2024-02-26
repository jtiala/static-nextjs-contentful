import { TypeManagerSkeleton, isTypeManager } from "@/generated/contentful";
import contentfulClient from "./lib/contentfulClient";

export async function fetchManagersCount() {
  const contentful = contentfulClient();

  const collection = await contentful.getEntries<TypeManagerSkeleton>({
    content_type: "manager",
  });

  return collection.total;
}

interface FetchManagersOptions {
  skip?: number;
  limit?: number;
}

export async function fetchManagersCollection(options?: FetchManagersOptions) {
  const contentful = contentfulClient();

  return await contentful.getEntries<TypeManagerSkeleton>({
    content_type: "manager",
    skip: options?.skip || 0,
    limit: options?.limit || 1000,
    order: ["fields.name"],
  });
}

interface FetchManagerOptions {
  id: string;
}

export async function fetchManager(options: FetchManagerOptions) {
  const contentful = contentfulClient();

  const entry = await contentful.getEntry(options.id);

  if (!isTypeManager(entry)) {
    throw new Error("Manager not found");
  }

  return entry;
}
