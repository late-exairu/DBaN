import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-white shadow-sm">
      <div className="container flex gap-5 py-2">
        <Logo />
        <Input type="text" placeholder="Search" />
        <Button variant="outline">Button</Button>
      </div>
    </header>
  );
}
