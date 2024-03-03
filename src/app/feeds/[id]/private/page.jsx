import ListThought from "@/components/thoughts/ListThought";
import { getMyThought, getSupabaseInstance, getUser } from "@/lib/supabase";

const PrivateFeed = async ({ params }) => {
  const supabase = getSupabaseInstance();
  const myThought = await getMyThought(supabase, params.id, true);
  return <ListThought thought={myThought} />;
};

export default PrivateFeed;
