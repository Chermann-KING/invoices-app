import React, { ReactNode } from "react";
import Link from "next/link";
import ThemeSwitch from "../../ThemeSwitch";
import Image from "next/image";
import avatar from "../../../../../public/images/image-avatar.jpg";
import logo from "../../../../../public/images/logo.svg";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className=" flex flex-1">
      {/* Left Side */}
      <aside className="w-[103px] h-screen flex flex-col justify-between items-center bg-[#373B53] dark:bg-color03 rounded-r-[20px]">
        {/* Logo */}
        <div className="relative w-full h-[103px] flex justify-center items-center bg-color01 rounded-r-[20px] overflow-hidden">
          <Link href={"/"} aria-label="Logo" className="absolute">
            <Image src={logo} alt="Image Avatar" width={40} height={38} />
          </Link>
          <div className="w-full h-1/2 bg-color02 self-end rounded-tl-[23px]"></div>
        </div>
        {/* *** */}
        <div className="flex flex-col items-center gap-y-4 w-full mb-[23px]">
          {/* Theme toggle */}
          <ThemeSwitch />

          <hr className="h-1 w-full border-[#494E6E]" />

          {/* User avatar */}
          <div className="bg-gray-300 rounded-full overflow-hidden w-[40px]">
            <Image src={avatar} alt="Image Avatar" width={40} height={40} />
          </div>
        </div>
      </aside>
      {/* Right Container */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;
