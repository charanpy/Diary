import NotFound from "@/components/shared/NotFound";
import ListThought from "@/components/thoughts/ListThought";
import { getMyThought, getSupabaseInstance } from "@/lib/supabase";

const PublicThought = async ({ params }) => {
  const supabase = getSupabaseInstance();
  const myThought = await getMyThought(supabase, params.id, false);

  if (!myThought) {
    return <NotFound />;
  }

  return <ListThought thought={myThought} />;
};

export default PublicThought;
