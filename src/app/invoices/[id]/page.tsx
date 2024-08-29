import React from "react";
import InvoiceDetail from "@/app/components/shared/invoice/InvoiceDetail";
import invoicesData from "@/app/data/invoices.json";
import { Invoice as InvoiceType } from "../../types";

interface InvoicePageProps {
  params: {
    id: string;
  };
}

// Fonction d'aide pour vérifier si un statut est valide
function isValidStatus(status: any): status is InvoiceType["status"] {
  return ["draft", "pending", "paid"].includes(status);
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
  const rawInvoice = invoicesData.find((inv) => inv.id === params.id);

  if (!rawInvoice) {
    return <div>Invoice not found</div>;
  }

  // S'assurer que le statut est valide, sinon la valeur par défaut est "draft".
  const invoice: InvoiceType = {
    ...rawInvoice,
    status: isValidStatus(rawInvoice.status) ? rawInvoice.status : "draft",
  };

  return <InvoiceDetail invoice={invoice} />;
};

export default InvoicePage;
