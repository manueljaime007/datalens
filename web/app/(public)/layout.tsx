import { PublicShell } from "@/components/site/public-shell";
import { getRepoStars } from "@/lib/github";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stars = await getRepoStars();
  return <PublicShell stars={stars}>{children}</PublicShell>;
}
