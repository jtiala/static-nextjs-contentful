import {
  fetchClubsCollection,
  fetchManager,
  fetchManagersCollection,
} from "@/api/contentful";
import AssetImage from "@/components/AssetImage";
import DetailsList from "@/components/DetailsList";
import Heading from "@/components/Heading";
import RichText from "@/components/RichText";
import { generateTitle } from "@/utils/metadata";
import { differenceInYears } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const manager = await fetchManager({
    id: params.id,
  });

  if (!manager) {
    return notFound();
  }

  const clubsCollection = await fetchClubsCollection();

  const club =
    manager.fields.club &&
    clubsCollection.items.find(
      (item) => item.sys.id === manager.fields.club?.sys.id
    );

  const formerClubs =
    manager.fields.formerClubs &&
    manager.fields.formerClubs.map((formerClub) =>
      clubsCollection.items.find((item) => item.sys.id === formerClub.sys.id)
    );

  const age = differenceInYears(new Date(), new Date(manager.fields.born));

  const details = [
    { title: "Nationality", details: manager.fields.nationality },
    { title: "Born", details: `${manager.fields.born} (age ${age} years)` },
    {
      title: "Club",
      details: club ? (
        <Link href={`/clubs/${club.sys.id}`} className="underline">
          {club.fields.name}
        </Link>
      ) : (
        "No current club"
      ),
    },
    { title: "Role", details: manager.fields.role },
    {
      title: "Former clubs",
      details:
        formerClubs && formerClubs?.length > 0 ? (
          <ul>
            {formerClubs?.map(
              (formerClub) =>
                formerClub && (
                  <li key={formerClub.sys.id}>
                    <Link
                      href={`/clubs/${formerClub.sys.id}`}
                      className="underline"
                    >
                      {formerClub.fields.name}
                    </Link>
                  </li>
                )
            )}
          </ul>
        ) : (
          "No former clubs"
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Heading level={2}>{manager.fields.name}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 text-sm text-gray-100">
          <RichText document={manager.fields.bio} />
          <DetailsList items={details} />
        </div>
        {manager.fields.photo && <AssetImage asset={manager.fields.photo} />}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const managersCollection = await fetchManagersCollection();

  return managersCollection.items.map((manager) => ({
    id: manager.sys.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const manager = await fetchManager({
    id: params.id,
  });

  if (!manager) {
    return notFound();
  }

  return {
    title: generateTitle(manager.fields.name),
  };
}
