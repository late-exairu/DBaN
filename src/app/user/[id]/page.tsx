import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { db } from "@/db";

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
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="">{result?.name}</p>
          <p className="">{result?.email}</p>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
