"use client";
import Input from "@/components/shared/Input";
import useSearchThoughts from "./useSearchThoughts";
import ListThoughts from "../ListThoughts";

const SearchThoughts = () => {
  const [startDateRef, endDateRef, isPrivateRef, searchResults, handleSubmit] =
    useSearchThoughts();
  return (
    <>
      <div className="my-20 flex flex-col items-center">
        <form
          className="bg-slate-100 flex flex-col dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-300 p-6 w-full md:w-96"
          onSubmit={handleSubmit}
        >
          <Input name="start date" type="datetime-local" ref={startDateRef} />
          <div className="my-4">
            <Input name="end date" type="datetime-local" ref={endDateRef} />
          </div>
          <div className="flex flex-row items-center">
            <input type="checkbox" id="isPrivate" ref={isPrivateRef} />
            <label className="ml-2 block my-4 capitalize text-sm font-medium text-gray-900 dark:text-white">
              Is Private
            </label>
          </div>
          <button
            className="p-2.5 bg-green-500 rounded-lg my-4"
            disabled={searchResults.loading}
          >
            {searchResults.loading ? "Filtering.." : "Filter"}
          </button>
        </form>
      </div>
      <div>
        <ListThoughts
          thoughts={searchResults.data}
          isSearchTriggered={searchResults.isSearchTriggered}
        />
      </div>
    </>
  );
};

export default SearchThoughts;
