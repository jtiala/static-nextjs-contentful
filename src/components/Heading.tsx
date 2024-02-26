import clsx from "clsx";
import { ReactNode, createElement } from "react";

interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
}

export default function Heading({ level, children }: Props) {
  const className = clsx({
    "text-4xl font-semibold": level === 1,
    "text-3xl font-semibold": level === 2,
    "text-2xl font-semibold": level === 3,
    "text-xl font-semibold": level < 3,
  });

  return createElement(`h${level}`, { className }, children);
}
