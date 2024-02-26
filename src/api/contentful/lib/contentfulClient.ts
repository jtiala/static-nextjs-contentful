import { createClient } from "contentful";
const { CONTENTFUL_INCLUDE_UNPUBLISHED } = process.env;

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
} = process.env;

const client = createClient({
  space: CONTENTFUL_SPACE_ID!,
  accessToken: CONTENTFUL_ACCESS_TOKEN!,
});

const previewClient = createClient({
  space: CONTENTFUL_SPACE_ID!,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
});

export default function contentfulClient() {
  if (CONTENTFUL_INCLUDE_UNPUBLISHED === "true") {
    return previewClient;
  }

  return client;
}
