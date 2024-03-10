import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/auth";

type ProfileProps = {
  user: {
    id: string;
    name: string;
    email: string;
    bio: string;
    image: string;
  };
  personal?: boolean;
};

export default async function Profile(props: ProfileProps) {
  const { user, personal } = props;
  const session = await auth();

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
        {user?.name}
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
                src={user?.image ?? "/game-image-placeholder.png"}
                alt={user?.name ?? "User Image Placeholder"}
                width={96}
                height={96}
                className="block rounded-md"
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <div>
                <label className="text-sm">Name</label>
                {personal ? (
                  <Input
                    type="text"
                    name="name"
                    defaultValue={user?.name ?? ""}
                  />
                ) : (
                  <p className="flex h-9 w-full min-w-52 py-2 text-sm">
                    {user?.name}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm">Email</label>
                <Input type="text" placeholder={user?.email} />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-sm">Bio</label>
              {personal ? (
                <Textarea name="bio" defaultValue={user?.bio ?? ""} />
              ) : (
                <p className="flex h-9 w-full min-w-52 py-2 text-sm">
                  {user?.bio}
                </p>
              )}
            </div>

            {personal ? (
              <Button className="" type="submit">
                Save
              </Button>
            ) : null}
          </form>
        </TabsContent>

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
