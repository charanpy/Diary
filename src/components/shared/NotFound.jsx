import Image from "next/image";

const NotFound = ({ type = "" }) => {
  return (
    <div className="my-28 flex flex-col items-center">
      <Image src="/notfound.png" width={200} height={200} alt="notfound" />
      <p className="text-md my-4 text-slate-700 dark:text-slate-300">
        {type === "page" ? "Page not found" : ""}
        {type === "error" ? "Something went wrong" : ""}
        {!type ? "No data found" : ""}
      </p>
    </div>
  );
};

export default NotFound;
