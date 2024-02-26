"use client";
import type { ImageLoaderProps } from "next/image";

export default function contentfulImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps) {
  return `${src}?w=${width}&q=${quality}`;
}
