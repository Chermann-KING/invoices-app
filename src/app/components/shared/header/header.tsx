"use client";

import React, { useState } from "react";
import FilterByStatus from "./FilterByStatus";
import Button from "../button/Button";
import PlusIcon from "../../../../../public/images/icon-plus.svg";
import InvoicePanel from "../invoice/InvoicePanel";

interface HeaderProps {
  onFilterChange: (status: "Draft" | "Pending" | "Paid") => void;
  invoiceCount: number;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange, invoiceCount }) => {
  // État pour gérer l'ouverture du panneau latéral
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Différents messages en fonction du nombre de factures et que l'on soit sur ordinateur, tablette ou téléphone
  const desktopInvoiceMessage =
    invoiceCount === 0
      ? "No invoices"
      : `There ${
          invoiceCount === 1 ? "is" : "are"
        } ${invoiceCount} total invoice${invoiceCount > 1 ? "s" : ""}`;

  const mobileInvoiceMessage =
    invoiceCount === 0
      ? "No invoices"
      : `${
          invoiceCount === 1
            ? `${invoiceCount} invoice`
            : `${invoiceCount} invoices`
        }`;

  return (
    <>
      <header className="h-[55px] flex justify-between items-center my-8 sm:my-[60px] lg:mt-[76px] lg:mb-[67px]">
        {/* titre */}
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[2.25rem] font-bold leading-none text-color08 dark:text-white">
            Invoices
          </h1>
          <p className="text-[0.813rem] text-color06 dark:text-color05">
            <span className="sm:hidden">{mobileInvoiceMessage}</span>
            <span className="hidden sm:inline">{desktopInvoiceMessage}</span>
          </p>
        </div>

        {/* actions */}
        <div className="w-auto sm:w-[370px] flex justify-between sm:justify-end items-center gap-x-[18px] sm:gap-x-0">
          <FilterByStatus onFilterChange={onFilterChange} />
          <Button
            type="button"
            variant="primary"
            className="gap-x-1.5 sm:gap-x-4"
            onClick={() => setIsPanelOpen(true)}
          >
            <span className="text-color01 w-[32px] h-[32px] rounded-full bg-white flex justify-center items-center">
              <PlusIcon className=" text-color01 mr-[-2px] mt-[2px]" />
            </span>
            <span className="pr-2 hidden sm:block">New Invoice</span>
            <span className="pr-2 sm:hidden block">New</span>
          </Button>
        </div>
      </header>

      {/* Panneau latéral pour l'édition/création de facture */}
      {isPanelOpen && (
        <InvoicePanel
          onClose={() => setIsPanelOpen(false)} // Fermer le panneau
          mode={"create"}
        />
      )}
    </>
  );
};

export default Header;
