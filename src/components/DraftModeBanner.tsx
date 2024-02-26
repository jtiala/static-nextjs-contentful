"use client";
import { usePathname } from "next/navigation";

export default function DraftModeBanner() {
  const pathname = usePathname();

  return (
    <p className="bg-red-600 p-4">
      Draft mode is on!{" "}
      <a href={`/api/disable-draft?redirect=${pathname}`} className="underline">
        Click here to exit.
      </a>
    </p>
  );
}
