import { Logo } from "@/components/ui/logo";
import Search from "@/components/Search";
import Burger from "@/components/Burger";
import UserBar from "@/components/UserBar";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-background/80 shadow-sm">
      <div className="container flex gap-2 py-2 md:gap-5">
        <Logo />
        <Search />

        <UserBar />

        <Burger className="flex lg:hidden" />
      </div>
    </header>
  );
}
