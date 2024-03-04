import { type Tag } from "@/types";
import Link from "next/link";

export default function GameTag(props: Tag) {
  const { name, slug } = props;

  return (
    <Link
      className="rounded-sm border border-secondary px-1 text-xs normal-case text-foreground transition-colors duration-100 hover:bg-background "
      href={`/tags/${slug}`}
    >
      {name}
    </Link>
  );
}
