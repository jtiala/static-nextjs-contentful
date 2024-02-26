import { ReactNode } from "react";

interface Props {
  items: {
    title: string;
    details?: ReactNode;
  }[];
}

export default async function DetailsList({ items }: Props) {
  return (
    <dl className="divide-y divide-gray-700">
      {items.map((item, index) => (
        <div
          key={index}
          className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt className="text-sm font-medium leading-6 text-white">
            {item.title}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-100 sm:col-span-2 sm:mt-0">
            {item.details || "-"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
