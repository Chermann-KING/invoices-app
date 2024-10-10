import React from "react";
import Link from "next/link";
import avatar from "../../../public/images/image-avatar.jpg";
import Logo from "../../../public/images/favicon-32x32.png";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
const Sidebar = () => {
  return (
    <aside className="z-[100] w-full md:w-[103px] h-[80px] md:h-screen flex flex-row md:flex-col justify-between items-center bg-[#373B53] dark:bg-color03   rounded-custom-blr md:rounded-custom-rtb ">
      {/* Logo */}
      <div className="relative w-[103px] md:w-full h-full md:h-[109px] flex justify-center items-center bg-color01  rounded-custom-blr md:rounded-custom-rtb overflow-hidden">
        <Link href={"/"} aria-label="Logo" className="absolute">
          {/* <Logo /> */}
          <Image src={Logo} alt="Logo" width={36} height={36} />
        </Link>
        <div className="w-full h-1/2 bg-color02 self-end rounded-tl-[23px]"></div>
      </div>
      {/* shwich theme button and profil picture */}
      <div className="w-full h-full flex flex-row  items-center md:flex-col justify-end gap-4 pr-8 md:pr-0 md:pb-8">
        {/* Theme toggle */}
        <ThemeSwitch />
        {/* divder */}
        <hr className="bg-[#494E6E] border-0 w-[1px] h-full md:w-full md:h-[1px]" />

        {/* User avatar */}
        <div className="bg-gray-300 rounded-full overflow-hidden w-[40px]">
          <Image src={avatar} alt="Image Avatar" width={40} height={40} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
