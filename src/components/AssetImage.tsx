import contentfulImageLoader from "@/utils/contentfulImageLoader";
import { Asset, AssetLink } from "contentful";
import Image from "next/image";

interface Props {
  asset?: Asset<undefined, string> | { sys: AssetLink };
  alt?: string;
}

export default function AssetImage({ asset, alt }: Props) {
  if (
    !asset ||
    !("fields" in asset) ||
    !asset.fields.file ||
    !asset.fields.file.details.image
  ) {
    return null;
  }

  const src = asset.fields.file.url;
  const resolvedAlt = alt || asset.fields.description || "";
  const width = asset.fields.file.details.image.width;
  const height = asset.fields.file.details.image.height;

  return (
    <Image
      loader={contentfulImageLoader}
      src={src}
      alt={resolvedAlt}
      width={width}
      height={height}
    />
  );
}
