"use client";

import React, { useState } from "react";
import FilterByStatus from "./FilterByStatus";
import Button from "../button/Button";
import InvoicePanel from "../invoice/InvoicePanel";

interface HeaderProps {
  onFilterChange: (status: "Draft" | "Pending" | "Paid") => void;
  invoiceCount: number; // Ajouter une prop pour le nombre de factures filtrées
}

const Header: React.FC<HeaderProps> = ({ onFilterChange, invoiceCount }) => {
  // État pour gérer l'ouverture du panneau latéral
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Différents messages en fonction du nombre de factures
  const invoiceMessage =
    invoiceCount === 0
      ? "No invoices"
      : `There ${
          invoiceCount === 1 ? "is" : "are"
        } ${invoiceCount} total invoice${invoiceCount > 1 ? "s" : ""}`;

  return (
    <>
      <header className="h-[55px] flex justify-between items-center mb-[64px]">
        {/* titre */}
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-[2.25rem] font-bold leading-none text-color08 dark:text-white">
            Invoices
          </h1>
          <p className="text-[0.813rem] text-color06 dark:text-color05">
            {invoiceMessage}
          </p>
        </div>

        {/* actions */}
        <div className="w-[370px] flex justify-between items-center">
          <FilterByStatus onFilterChange={onFilterChange} />
          <Button onClick={() => setIsPanelOpen(true)} />
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
