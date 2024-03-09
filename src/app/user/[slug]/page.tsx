import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { users } from "@/db/schema";
import { db } from "@/db";
import Profile from "@/components/Profile";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const session = await auth();

  const result = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id ?? ""),
  });

  if (!session) {
    return <div>Unauthorized</div>;
  }

  if (!result) {
    return <div>User not found</div>;
  }

  if (slug !== session?.user?.name) {
    return <div>Other user profile</div>;
  }

  const user = {
    id: result.id,
    name: result.name ?? "",
    email: result.email,
    bio: result.bio ?? "",
    image: result.image ?? "",
  };

  return <Profile user={user} personal />;
}
