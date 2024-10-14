"use client";

import React, { useState } from "react";
import Header from "@/app/components/shared/header/header";
import Invoices from "@/app/invoices/page";
import invoicesData from "@/app/data/invoices.json";
import { Invoice as InvoiceType } from "@/app/types";

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
    <div className="min-h-screen w-full max-w-[730px] min-w-[327px] mx-auto">
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
