import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAvatar = (userId, avatar) => {
  const supabase = createClientComponentClient();
  const [avatarPath, setAvatarPath] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (avatar) {
      setAvatarPath(avatar);
      getImageURL(avatar);
    }
  }, [avatar]);

  const updateProfile = async (pathNmae) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: pathNmae })
        .eq("id", userId);
      if (error) {
        toast.error("Updating profile failed");
      }
    } catch (e) {}
  };

  const getImageURL = async (pathName) => {
    try {
      const { data } = await supabase.storage.from("avatar").download(pathName);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (e) {}
  };

  const deleteAvatar = async (pathName) => {
    try {
      await supabase.storage.from("avatar").remove([pathName]);
    } catch (e) {}
  };

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        return toast.error("Please select an image");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;
      const {
        data: { path },
        error: uploadError,
      } = await supabase.storage.from("avatar").upload(filePath, file);

      if (uploadError) {
        toast.error("Unable to upload image");
      }
      if (avatarPath) {
        deleteAvatar(avatarPath);
      }
      setAvatarPath(path);
      updateProfile(path);
      getImageURL(path);
    } catch (error) {
      toast.error("Unable to upload image");
    } finally {
      setUploading(false);
    }
  };

  return [avatarUrl, uploading, uploadAvatar];
};
