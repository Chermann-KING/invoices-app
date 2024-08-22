"use client";

import React, { createContext, useContext, useState } from "react";

interface SidebarContextProps {
  isAsideHidden: boolean;
  setIsAsideHidden: (isHidden: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "useSidebarContext doit être utilisé dans un SidebarProvider"
    );
  }
  return context;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAsideHidden, setIsAsideHidden] = useState(false);

  return (
    <SidebarContext.Provider value={{ isAsideHidden, setIsAsideHidden }}>
      {children}
    </SidebarContext.Provider>
  );
};
