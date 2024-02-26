import clsx from "clsx";
import Link from "next/link";

interface Props {
  totalPages: number;
  currentPage?: number;
  generateLink: (page: number) => string;
}

export default function Pagination({
  totalPages,
  currentPage,
  generateLink,
}: Props) {
  const pageNubmers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex flex-row gap-4">
      {pageNubmers.map((pageNumber) => {
        const className = clsx(
          "flex justify-center items-center w-10 h-10 rounded-full border border-transparent transition-colors hover:border-neutral-700 hover:bg-neutral-800/30",
          { "font-bold": pageNumber === currentPage }
        );

        return (
          <li key={pageNumber}>
            <Link href={generateLink(pageNumber)} className={className}>
              {pageNumber}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
