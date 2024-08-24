import React from "react";
import ThemeSwitch from "../../ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
import avatar from "../../../../../public/images/image-avatar.jpg";
import Logo from "../../../../../public/images/logo.svg";

const Aside = () => {
  return (
    <aside className="z-[100] w-[103px] h-screen flex flex-col justify-between items-center bg-[#373B53] dark:bg-color03 rounded-r-[20px]">
      {/* Logo */}
      <div className="relative w-full h-[103px] flex justify-center items-center bg-color01 rounded-r-[20px] overflow-hidden">
        <Link href={"/"} aria-label="Logo" className="absolute">
          <Logo />
        </Link>
        <div className="w-full h-1/2 bg-color02 self-end rounded-tl-[23px]"></div>
      </div>
      {/* *** */}
      <div className="flex flex-col items-center gap-y-4 w-full mb-[23px] ">
        {/* Theme toggle */}
        <ThemeSwitch />

        <hr className="h-1 w-full border-[#494E6E]" />

        {/* User avatar */}
        <div className="bg-gray-300 rounded-full overflow-hidden w-[40px]">
          <Image src={avatar} alt="Image Avatar" width={40} height={40} />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
