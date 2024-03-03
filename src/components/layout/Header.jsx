"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ConditionalRender from "../util/ConditionalRender";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import { useEffect } from "react";

const Header = () => {
  const pathName = usePathname();

  useEffect(() => {
    if (document.querySelector(".navbar")) {
      document.querySelector(".navbar").classList.remove("flex");
      document.querySelector(".navbar").classList.add("hidden");
    }
  }, [pathName]);

  return (
    <header className="w-full flex flex-row items-center justify-between pb-7">
      <Link href="/">
        <h1 className="dark:text-slate-200 text-slate-700 text-xl">
          My-Thoughts
        </h1>
      </Link>

      <ConditionalRender canRender={pathName !== "/auth"}>
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <div className="flex md:hidden">
          <MobileNavbar />
        </div>
      </ConditionalRender>
    </header>
  );
};

export default Header;
