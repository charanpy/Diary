import ListThoughtsWrapper from "@/components/thoughts/ListThoughtsContainer";
import { getMyThoughts } from "@/lib/supabase";

const Feeds = async () => {
  const feeds = await getMyThoughts(false);
  return <ListThoughtsWrapper feeds={feeds} isPrivate={false} />;
};

export default Feeds;
