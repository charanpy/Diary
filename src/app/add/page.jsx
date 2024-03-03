import AddThoughts from "@/components/add-thoughts/AddThoughts";
import { getUser } from "@/lib/supabase";

const AddThoughtsPage = async () => {
  const user = await getUser();
  return (
    <section className="mainContainer items-center justify-center leading-10 flex flex-col">
      <h1 className="text-xl text-slate-700 dark:text-slate-300 my-6">
        Add Thoughts
      </h1>

      <AddThoughts userId={user?.[0]?.id} user={user?.[0]} />
    </section>
  );
};

export default AddThoughtsPage;
