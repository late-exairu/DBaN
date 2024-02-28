import { Logo } from "@/components/ui/logo";
import Search from "@/components/Search";
import Link from "next/link";
import Image from "next/image";
import Burger from "@/components/Burger";
import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-background shadow-sm">
      <div className="container flex gap-2 py-2 md:gap-5">
        <Logo />
        <Search />
        {session?.user ? (
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
                  <div className="text-xs text-foreground">
                    {session.user.email}
                  </div>

                  <ul className="mt-3">
                    <li>
                      <SignOut />
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="default">Sign in</Button>
          </Link>
        )}

        <Burger className="flex lg:hidden" />
      </div>
    </header>
  );
}
