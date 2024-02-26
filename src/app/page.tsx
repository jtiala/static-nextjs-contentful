import Link from "next/link";

export default function Home() {
  const links = [
    {
      url: "/leagues",
      text: "Leagues",
      description: "Find in-depth information about football leagues.",
    },
    {
      url: "/clubs",
      text: "Clubs",
      description: "Find in-depth information about football clubs.",
    },
    {
      url: "/players",
      text: "Players",
      description: "Find in-depth information about football players.",
    },
    {
      url: "/managers",
      text: "Managers",
      description: "Find in-depth information about football managers.",
    },
  ];

  return (
    <ul className="grid w-full grid-cols-1 lg:grid-cols-4">
      {links.map((link) => (
        <li key={link.url}>
          <Link
            href={link.url}
            className="block group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              {link.text}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              {link.description}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
