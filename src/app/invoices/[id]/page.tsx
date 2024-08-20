import React from "react";
import InvoiceDetail from "@/app/components/shared/invoice/InvoiceDetail";
import invoicesData from "@/app/data/invoices.json"; // Remplacer par l'appel API si nécessaire

interface InvoicePageProps {
  params: {
    id: string;
  };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
  const invoice = invoicesData.find((inv) => inv.id === params.id);

  //   if (!invoice) {
  //     return <div>Invoice not found</div>;
  //   }

  return <InvoiceDetail invoice={invoice} />;
};

export default InvoicePage;
