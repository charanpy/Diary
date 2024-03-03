"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, compare } from "bcrypt";
import { revalidatePath } from "next/cache";
import Cryptr from "cryptr";
import { getAuthUser, getSupabaseInstance } from "./lib/supabase";

export const signout = async () => {
  const supabase = getSupabaseInstance();
  const user = await getAuthUser(supabase);

  if (user) {
    await supabase.auth.signOut();
  }

  redirect("/auth");
};

export const storePrivatePassword = async (state, formData) => {
  try {
    const supabase = getSupabaseInstance();
    const { data } = await supabase.auth.getUser();

    if (!data || !data?.user) {
      state.error = "Not Authorized";
    }
    const password = formData.get("password");
    if (!password || password.length < 6) {
      state.error = "Secret should be minimum of 6 characters";
      return state;
    }

    const hashedSecret = await hash(password, 10);
    const { error } = await supabase
      .from("profiles")
      .update({ private_password: hashedSecret })
      .eq("id", data.user.id);

    if (error) {
      state.error = "Something went wrong";
    }

    state.error = "";
    state.success = true;
  } catch (e) {
    state.error = "Something went wrong. Try again";
  } finally {
    return state;
  }
};

export const deleteThought = async (id) => {
  try {
    const supabase = getSupabaseInstance();
    const user = await getAuthUser(supabase);
    if (!user) {
      return;
    }

    await supabase
      .from("thoughts")
      .delete()
      .eq("user_id", user.id)
      .eq("id", id);
    revalidatePath("/");
  } catch (e) {}
};

export const sendPassword = async (state, formData) => {
  try {
    const password = formData.get("password");
    if (!password) {
      state.error = "Please enter password";
      return state;
    }
    const supabase = getSupabaseInstance();
    const user = await getAuthUser(supabase);

    if (!user) {
      state.error = "Something went wrong";
      return state;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user.id);

    if (error || !data) {
      state.error = "Something went wrong";
      return state;
    }

    const isMatch = await compare(password, data?.[0]?.private_password);

    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    const encryptedRes = cryptr.encrypt(user.id);
    if (!isMatch) {
      state.error = "Invalid Password";
      return state;
    }
    cookies().set("user", encryptedRes);
  } catch (error) {
    state.error = "Something went wrong";
    return state;
  }
  redirect(`/feeds/${state.id}/private`);
};

export const addThought = async (formData) => {
  try {
    const { title, content, isPrivate } = formData;

    if (!title || !content) {
      return {
        error: "Please fill all fields",
      };
    }

    const supabase = getSupabaseInstance();

    const user = await getAuthUser(supabase);

    if (!user) {
      return {
        error: "Something went wrong.",
      };
    }

    const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CLIENT_SECRET, {
      saltLength: 10,
    });

    const contentCryptr = new Cryptr(process.env.SERVER_SECRET);
    revalidatePath(isPrivate ? "/" : "/feeds");
    const { error } = await supabase.from("thoughts").insert({
      user_id: user?.id,
      content: isPrivate
        ? contentCryptr.encrypt(cryptr.decrypt(content))
        : content,
      title,
      is_private: isPrivate,
    });

    if (error) {
      return {
        error: "Something went wrong.",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
};
