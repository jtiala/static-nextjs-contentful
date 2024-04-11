import { createClient } from "contentful";

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_ENVIRONMENT_ID,
  CONTENTFUL_CONTENT_PREVIEW,
} = process.env;

const useContentPreview = CONTENTFUL_CONTENT_PREVIEW === "true";

if (useContentPreview && CONTENTFUL_ENVIRONMENT_ID !== "master") {
  console.log(
    `Content preview works only in the master environment. Using master instead of ${CONTENTFUL_ENVIRONMENT_ID}.`
  );
}

const client = createClient({
  host: useContentPreview ? "preview.contentful.com" : "cdn.contentful.com",
  space: CONTENTFUL_SPACE_ID!,
  environment: useContentPreview ? "master" : CONTENTFUL_ENVIRONMENT_ID!,
  accessToken: useContentPreview
    ? CONTENTFUL_PREVIEW_ACCESS_TOKEN!
    : CONTENTFUL_ACCESS_TOKEN!,
});

export default function contentfulClient() {
  return client;
}
