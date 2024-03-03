"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import ConditionalRender from "../util/ConditionalRender";
import { deleteThought } from "@/action";
import NotFound from "../shared/NotFound";
import LockIcon from "./LockIcon";

const ListThought = ({ thought }) => {
  const deleteThoughtWityUserId = deleteThought.bind(null, thought.id);
  return (
    <li className="thought cursor-pointer mb-4 p-4 rounded-lg bg-slate-100 md:mr-8 dark:bg-gray-700 list-none w-full">
      <div className="flex flex-row flex-wrap justify-between items-center">
        <p className="text-lg text-slate-700 dark:text-slate-300">
          {thought.title}
        </p>
        <LockIcon id={thought?.id} isPrivate={thought.is_private} />
      </div>
      <div className="flex flex-row flex-wrap justify-end mt-4 items-center">
        <p className="text-slate-500 dark:text-slate-300 text-md">
          {new Date(thought.created_at).toDateString()}
        </p>
        <form action={deleteThoughtWityUserId}>
          <button>
            <TrashIcon className="w-5 h-5 text-red-500 ml-4" />
          </button>
        </form>
      </div>
    </li>
  );
};

const ListThoughts = ({ thoughts, isSearchTriggered = true }) => {
  return (
    <>
      <ConditionalRender canRender={thoughts && thoughts.length}>
        <ul className="flex flex-row flex-wrap" suppressHydrationWarning={true}>
          {thoughts &&
            thoughts.map((thought) => (
              <ListThought thought={thought} key={thought.id} />
            ))}
        </ul>
      </ConditionalRender>
      <ConditionalRender
        canRender={(!thoughts || !thoughts.length) && isSearchTriggered}
      >
        <NotFound />
      </ConditionalRender>
    </>
  );
};

export default ListThoughts;
