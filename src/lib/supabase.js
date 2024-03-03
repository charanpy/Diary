import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Cryptr from "cryptr";
import { cookies } from "next/headers";

export const getSupabaseInstance = () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  return supabase;
};

export const getUser = async () => {
  try {
    const supabase = getSupabaseInstance();
    return getUserProfile(supabase);
  } catch (error) {
    return null;
  }
};

export const getAuthUser = async (supabase) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserProfile = async (supabase) => {
  try {
    const user = await getAuthUser(supabase);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id);

    return data;
  } catch (e) {
    return null;
  }
};

export const getMyThought = async (supabase, id, isPrivate = false) => {
  try {
    const user = await getAuthUser(supabase);

    if (!user) {
      return null;
    }
    const { data } = await supabase
      .from("thoughts")
      .select()
      .eq("user_id", user.id)
      .eq("id", id);

    if (!data || !data?.length) {
      return null;
    }

    const thought = data?.[0];
    if (isPrivate) {
      const cryptr = new Cryptr(process.env.SERVER_SECRET);
      thought.content = cryptr.decrypt(thought.content);
    }
    return thought;
  } catch (error) {
    return null;
  }
};

export const getMyThoughts = async (isPrivate) => {
  const supabase = getSupabaseInstance();
  const user = await getAuthUser(supabase);

  const { data: feeds } = await supabase
    .from("thoughts")
    .select()
    .order("created_at", { ascending: false })
    .eq("user_id", user?.id)
    .eq("is_private", isPrivate);

  return feeds;
};
