import {
  fetchClubsCollection,
  fetchManagersCollection,
} from "@/api/contentful";
import Heading from "@/components/Heading";
import { generateTitle } from "@/utils/metadata";
import { differenceInYears } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export default async function Page() {
  const managersCollection = await fetchManagersCollection();
  const clubsCollection = await fetchClubsCollection();

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>Managers</Heading>
      <ul>
        {managersCollection.items.map((manager) => {
          const age = differenceInYears(
            new Date(),
            new Date(manager.fields.born)
          );

          const club =
            manager.fields.club &&
            clubsCollection.items.find(
              (item) => item.sys.id === manager.fields.club?.sys.id
            );

          const details = [
            ...(club ? [club.fields.name] : []),
            manager.fields.nationality,
            `${age} years`,
          ];

          return (
            <li key={manager.sys.id}>
              <Link
                href={`/managers/${manager.sys.id}`}
                className="flex flex-col group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
              >
                {manager.fields.name}
                <span className="m-0 text-sm opacity-50">
                  {details.join(" | ")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const metadata: Metadata = {
  title: generateTitle("Managers"),
};
