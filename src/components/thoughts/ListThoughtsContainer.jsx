import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ListThoughts from "./ListThoughts";

const ListThoughtsWrapper = ({ feeds, isPrivate }) => {
  return (
    <>
      <div className="my-6 flex flex-row flex-wrap justify-between items-center">
        <h1 className="text-slate-700 text-xl dark:text-slate-300">
          {isPrivate ? "Your's Private Lists" : "Your's Public Lists"}
        </h1>
        <div>
          <Link href="/add">
            <button className="p-1 w-20 text-white bg-green-500 rounded-lg flex flex-row flex-wrap items-center justify-center">
              <PlusIcon className="w-4 h-4 mr-1" /> Add
            </button>
          </Link>
        </div>
      </div>
      <ListThoughts thoughts={feeds} />
    </>
  );
};

export default ListThoughtsWrapper;
