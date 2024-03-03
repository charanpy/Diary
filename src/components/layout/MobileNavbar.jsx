import { Bars3Icon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import { useState } from "react";
import ConditionalRender from "../util/ConditionalRender";

const MobileNavbar = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Bars3Icon
        className="w-5 h-5 mr-2"
        onClick={() => setShow((prev) => !prev)}
      />
      <div
        className={`navbar absolute bg-slate-200 dark:bg-slate-700 px-4 py-2.5 z-10 border border-slate-300 dark:border-slate-500 ${
          show ? "flex" : "hidden"
        }`}
        style={{ top: "30px", right: "5px" }}
      >
        <Navbar />
      </div>
    </div>
  );
};

export default MobileNavbar;
