"use client";

import Link from "next/link";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import ConditionalRender from "../util/ConditionalRender";

const LockIcon = ({ id, isPrivate }) => {
  return (
    <Link href={isPrivate ? `/feeds/${id}/password` : `/feeds/${id}`}>
      <ConditionalRender canRender={isPrivate}>
        <LockClosedIcon className="w-5 h-5 text-green-500" />
      </ConditionalRender>
      <ConditionalRender canRender={!isPrivate}>
        <LockOpenIcon className="w-5 h-5 text-green-500" />
      </ConditionalRender>
    </Link>
  );
};

export default LockIcon;
