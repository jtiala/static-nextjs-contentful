import { TypeClubSkeleton, TypePlayerSkeleton } from "@/generated/contentful";
import { EntryCollection } from "contentful";
import { differenceInYears } from "date-fns";
import Link from "next/link";

interface Props {
  playersCollection: EntryCollection<TypePlayerSkeleton, undefined, string>;
  clubsCollection: EntryCollection<TypeClubSkeleton, undefined, string>;
}

export default function PlayersList({
  playersCollection,
  clubsCollection,
}: Props) {
  return (
    <ul>
      {playersCollection.items.map((player) => {
        const age = differenceInYears(new Date(), new Date(player.fields.born));

        const club =
          player.fields.club &&
          clubsCollection.items.find(
            (item) => item.sys.id === player.fields.club?.sys.id
          );

        const details = [
          player.fields.position,
          ...(club ? [club.fields.name] : []),
          player.fields.nationality,
          `${age} years`,
        ];

        return (
          <li key={player.sys.id}>
            <Link
              href={`/players/${player.sys.id}`}
              className="flex flex-col group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
            >
              {player.fields.name}
              <span className="m-0 text-sm opacity-50">
                {details.join(" | ")}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
