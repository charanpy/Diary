import ListThoughtsWrapper from "@/components/thoughts/ListThoughtsContainer";
import { getMyThoughts } from "@/lib/supabase";

export default async function Home() {
  const feeds = await getMyThoughts(true);
  return <ListThoughtsWrapper isPrivate={true} feeds={feeds} />;
}
