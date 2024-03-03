"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import ConditionalRender from "../util/ConditionalRender";
import { useAvatar } from "./useAvatar";
import Image from "next/image";

const Avatar = ({ avatar, userId }) => {
  const [avatarUrl, uploading, uploadAvatar] = useAvatar(userId, avatar);

  return (
    <>
      <ConditionalRender canRender={avatarUrl}>
        <div className="w-48 h-48 relative">
          <Image
            src={avatarUrl}
            fill
            alt="Profile image"
            className="rounded-full"
            loading="lazy"
          />
        </div>
      </ConditionalRender>
      <ConditionalRender canRender={!avatar && !avatarUrl}>
        <UserCircleIcon className="w-20 h-20" />
      </ConditionalRender>
      <input
        type="file"
        className="hidden"
        id="file"
        accept="image/*"
        onChange={uploadAvatar}
      />
      <label
        htmlFor="file"
        className="text-slate-700 dark:text-slate-100 underline cursor-pointer"
      >
        Change Profile Image
      </label>
    </>
  );
};

export default Avatar;
