import React from "react";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "../../../../../public/images/icon-arrow-right.svg";

interface InvoiceProps {
  id: string;
  paymentDue: string;
  clientName: string;
  total?: number;
  status: "draft" | "pending" | "paid";
}

const Invoice: React.FC<InvoiceProps> = ({
  id,
  paymentDue,
  clientName,
  total,
  status,
}) => {
  // Définition des classes de statut en fonction du statut
  let statusClasses = "";
  let dotClasses = "";

  switch (status) {
    case "paid":
      statusClasses =
        "bg-[#33D69F0D] text-[#33D69F] dark:bg-[#33D69F1A] dark:text-[#33D69F]";
      dotClasses = "bg-[#33D69F]";
      break;
    case "pending":
      statusClasses =
        "bg-[#FF8F000D] text-[#FF8F00] dark:bg-[#FF8F001A] dark:text-[#FF8F00]";
      dotClasses = "bg-[#FF8F00]";
      break;
    case "draft":
      statusClasses =
        "bg-[#373B530D] text-[#373B53] dark:bg-[#DFE3FA0D] dark:text-[#DFE3FA]";
      dotClasses = "bg-[#373B53] dark:bg-color05";
      break;
  }

  return (
    <Link
      href={`/invoices/${id}`}
      aria-label={`invoice-${id}`}
      className="w-[730px] h-[72px] flex flex-row justify-between items-center bg-white dark:bg-color03 text-[#7E88C3] dark:text-white rounded-[8px] shadow-md pl-[32px] pr-[23px]"
    >
      {/* ID, Date d'échéance & Nom du client */}
      <div className="flex items-center justify-start gap-x-12 mb-[-3px]">
        {/* ID & Date d'échéance */}
        <div className="flex items-center justify-start gap-x-11">
          {/* ID */}
          <span className="text-color07">
            #<strong className="text-[#0C0E16] dark:text-white">{id}</strong>
          </span>
          {/* Date d'échéance */}
          <span className="dark:text-color05 ">Due {paymentDue}</span>
        </div>

        {/* Nom du client */}
        <span>{clientName}</span>
      </div>

      {/* Montant total, Statut & Icône */}
      <div className="flex items-center gap-x-10">
        {/* Montant total */}
        <span className="mb-[-3px]">
          <strong className="text-[#0C0E16] dark:text-white text-right">
            £ {total?.toFixed(2) || "0.00"}
          </strong>
        </span>

        {/* Statut & Icône */}
        <div className="flex items-center gap-x-5">
          {/* Statut */}
          <div
            className={`w-[104px] h-[40px] flex justify-center items-center gap-2 rounded-md ${statusClasses}`}
          >
            {/* Dot */}
            <div className={`w-2 h-2 rounded-full ${dotClasses}`}></div>
            {/* Texte du statut */}
            {/* Texte du statut */}
            <strong className="leading-none mb-[-3px]">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </strong>
          </div>

          {/* Icône */}
          <div className="w-[12px] h-[16px]">
            <Image src={arrowRight} alt="right-arrow" width={12} height={16} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Invoice;
