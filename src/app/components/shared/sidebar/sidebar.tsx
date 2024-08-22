"use client";

import React, { ReactNode } from "react";
import { useSidebarContext } from "../../../context/SidebarContext";

import Aside from "./Aside";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const { isAsideHidden } = useSidebarContext();
  return (
    <div className=" flex flex-1">
      {/* Left Side */}
      {!isAsideHidden && <Aside />}
      {/* Right Container */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;
