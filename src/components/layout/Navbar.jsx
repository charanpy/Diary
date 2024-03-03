import {
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ThemeSwitcher from "../themes/ThemeSwitcher";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col md:flex-row">
        <Link href="/feeds">
          <li className="flex flex-row items-center dark:text-slate-300 cursor-pointer hover:text-green-500 dark:hover:text-green-500 text-slate-600 text-base mr-0 mb-4 md:mb-0 md:mr-10">
            <ArchiveBoxIcon className="w-5 h-5 mr-2" /> Feeds
          </li>
        </Link>
        <Link href="/profile">
          <li className="flex flex-row items-center dark:text-slate-300 cursor-pointer hover:text-green-500 dark:hover:text-green-500 text-slate-600 text-base mr-0 mb-4 md:mb-0 md:mr-10">
            <UserCircleIcon className="w-5 h-5 mr-2" /> Profile
          </li>
        </Link>
        <Link href="/search">
          <li className="flex flex-row items-center dark:text-slate-300 cursor-pointer hover:text-green-500 dark:hover:text-green-500 text-slate-600 text-base mr-0 mb-4 md:mb-0 md:mr-10">
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" /> Search
          </li>
        </Link>
        <li className="flex flex-row items-center dark:text-slate-300 cursor-pointer hover:text-green-500 dark:hover:text-green-500 text-slate-600 text-base mr-0 mb-4 md:mb-0 md:mr-10">
          <ThemeSwitcher /> Theme
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
