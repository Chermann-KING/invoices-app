"use client";

import React, { useState } from "react";
import Header from "../app/components/shared/header/Header";
import Invoices from "./components/shared/invoice/Invoices";
import invoicesData from "./data/invoices.json";
import { Invoice as InvoiceType } from "./types";

// Fonction pour normaliser le statut d'une invoice
const normalizeInvoiceStatus = (invoiceData: any[]): InvoiceType[] => {
  return invoiceData.map((invoice) => {
    const normalizedStatus = ["draft", "pending", "paid"].includes(
      invoice.status.toLowerCase()
    )
      ? invoice.status.toLowerCase()
      : "draft";
    return {
      ...invoice,
      status: normalizedStatus as "draft" | "pending" | "paid",
    };
  });
};

// Utilisation de la fonction de normalisation
const normalizedInvoices = normalizeInvoiceStatus(invoicesData);

export default function Home() {
  const [filterStatus, setFilterStatus] = useState<
    "Draft" | "Pending" | "Paid" | null
  >(null);

  // Fonction pour gérer le changement de filtre
  const handleFilterChange = (status: "Draft" | "Pending" | "Paid") => {
    setFilterStatus(status);
  };

  // Filtre les factures en fonction du statut sélectionné
  const filteredInvoices = filterStatus
    ? normalizedInvoices.filter(
        (invoice: InvoiceType) => invoice.status === filterStatus.toLowerCase()
      )
    : normalizedInvoices;

  return (
    <div className="min-h-screen pt-[65px] w-full max-w-[730px] min-w-[327px] mx-auto">
      <Header
        onFilterChange={handleFilterChange}
        invoiceCount={filteredInvoices.length}
      />
      <main>
        <Invoices invoices={filteredInvoices} />
      </main>
    </div>
  );
}
