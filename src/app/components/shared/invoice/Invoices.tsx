import React from "react";
import Invoice from "./Invoice";
import { Invoice as InvoiceType } from "../../../types";
import EmptyState from "./NoInvoice";

interface InvoicesProps {
  invoices: InvoiceType[];
}

const Invoices: React.FC<InvoicesProps> = ({ invoices }) => {
  if (invoices.length === 0) {
    return <EmptyState />; // Afficher EmptyState si aucune facture
  }
  return (
    <div className="flex flex-col gap-4">
      {invoices.map((invoice) => (
        <Invoice
          key={invoice.id}
          id={invoice.id}
          paymentDue={invoice.paymentDue}
          clientName={invoice.clientName}
          total={invoice.total}
          status={invoice.status}
        />
      ))}
    </div>
  );
};

export default Invoices;
