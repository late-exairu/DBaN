import { eq } from "drizzle-orm";
import Image from "next/image";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { db } from "@/db";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Page() {
  const session = await auth();

  const result = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id ?? ""),
  });

  return (
    <main className="relative flex flex-col">
      <h1 className="my-3 text-2xl font-black md:my-4 md:text-3xl xl:my-5 xl:text-4xl">
        Profile
      </h1>
      <Tabs defaultValue="account" className="max-w-[600px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-6 flex flex-col gap-4" value="account">
          <div className="col-span-2">
            <Image
              src={result?.image ?? "/game-image-placeholder.png"}
              alt={result?.name ?? "User Image Placeholder"}
              width={64}
              height={64}
              className="block rounded-md"
            />
          </div>

          <div className="col-span-2 flex gap-4">
            <div>
              <label className="text-sm">Name</label>
              <Input type="text" placeholder={result?.name ?? ""} readOnly />
            </div>
            <div>
              <label className="text-sm">Email</label>
              <Input type="text" placeholder={result?.email} readOnly />
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm">Bio</label>
            <Textarea />
          </div>
        </TabsContent>

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
