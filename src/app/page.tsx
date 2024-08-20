"use client";

import React, { useState } from "react";
import Header from "@/app/components/shared/header/header";
import Invoices from "./components/shared/invoice/Invoices";
import invoicesData from "./data/invoices.json"; // Importe tes données de factures
import { Invoice as InvoiceType } from "./types";

export default function Home() {
  const [filterStatus, setFilterStatus] = useState<
    "Draft" | "Pending" | "Paid" | null
  >(null);

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (status: "Draft" | "Pending" | "Paid") => {
    setFilterStatus(status);
  };

  // Filtrer les factures en fonction du statut sélectionné
  const filteredInvoices = filterStatus
    ? invoicesData.filter(
        (invoice: InvoiceType) => invoice.status === filterStatus.toLowerCase()
      )
    : invoicesData;

  return (
    <div className="min-h-screen pt-[65px] w-full max-w-[730px] min-w-[327px] mx-auto">
      {/* Passer la fonction de changement de filtre et le nombre de factures filtrées à Header */}
      <Header
        onFilterChange={handleFilterChange}
        invoiceCount={filteredInvoices.length}
      />
      <main className="">
        {/* Passer les factures filtrées à Invoices */}
        <Invoices invoices={filteredInvoices} />
      </main>
    </div>
  );
}
