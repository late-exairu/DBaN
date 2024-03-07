import { eq } from "drizzle-orm";
import Image from "next/image";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { db } from "@/db";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const session = await auth();

  const result = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id ?? ""),
  });

  async function handleSave(formData: FormData) {
    "use server";

    await db
      .update(users)
      .set({
        name: formData.get("name") as string,
        bio: formData.get("bio") as string,
      })
      .where(eq(users.id, session?.user?.id ?? ""));

    console.log("Save");
  }

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

        <TabsContent className="mt-6" value="account">
          <form action={handleSave} className="flex flex-col gap-4">
            <div className="col-span-2">
              <Image
                src={result?.image ?? "/game-image-placeholder.png"}
                alt={result?.name ?? "User Image Placeholder"}
                width={96}
                height={96}
                className="block rounded-md"
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <div>
                <label className="text-sm">Name</label>
                <Input
                  type="text"
                  name="name"
                  defaultValue={result?.name ?? ""}
                />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <Input type="text" placeholder={result?.email} readOnly />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-sm">Bio</label>
              <Textarea name="bio" defaultValue={result?.bio ?? ""} />
            </div>

            <Button className="mt-4" type="submit">
              Save
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
