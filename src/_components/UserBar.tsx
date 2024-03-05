import Link from "next/link";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
}

export default async function UserBar() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/api/auth/signin">
        <Button variant="default">Sign in</Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-1">
      {session.user.name && session.user.image && (
        <Popover>
          <PopoverTrigger>
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={36}
              height={36}
              className="block h-9 w-9 min-w-9 rounded-md"
            />
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="">{session.user.name}</div>
            <div className="text-xs text-foreground">{session.user.email}</div>

            <ul className="mt-3 flex flex-col gap-2">
              <li className="text-sm">
                <Link href={`/user/${session.user.name}`}>Profile</Link>
              </li>
              <li>
                <SignOut />
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
