"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Invoice as InvoiceType } from "../../../types";
import Image from "next/image";
import arrowLeft from "../../../../../public/images/icon-arrow-left.svg";

interface InvoiceDetailProps {
  invoice: InvoiceType;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const router = useRouter();

  // Définition des classes de statut en fonction du statut
  let statusClasses = "";
  let dotClasses = "";

  switch (invoice.status) {
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
    <div className="w-full max-w-[730px] min-w-[327px] mx-auto mt-16">
      {/* Bouton Retour */}
      <button
        onClick={() => router.back()}
        className="w-[80px] h-[15px] flex items-center justify-between text-purple-500 dark:text-white mb-8"
      >
        <Image src={arrowLeft} alt="back icon" />
        <span className="leading-none font-bold mb-[-4px]">Go back</span>
      </button>

      {/* Détails de la facture */}
      <div className=" h-[743px] mx-auto flex flex-col gap-y-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="w-full h-[88px] flex justify-between items-center bg-white dark:bg-color03 rounded-lg px-8 ">
          {/* Text & Statut */}
          <div className="flex items-center gap-x-5">
            {/* Text */}
            <span className="text-[0.813rem]">Status</span>
            {/* Statut */}
            <div
              className={`w-[104px] h-[40px] flex justify-center items-center gap-2 rounded-md ${statusClasses}`}
            >
              {/* Dot */}
              <div className={`w-2 h-2 rounded-full ${dotClasses}`}></div>
              {/* Texte du statut */}
              <strong className="leading-none mb-[-3px]">
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </strong>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="px-[23.65px] py-3 bg-gray-200 dark:bg-color04 dark:text-color05 font-bold rounded-3xl">
              Edit
            </button>
            <button className="px-[23.65px] py-3 bg-red-600-200 bg-color09 text-white font-bold rounded-3xl">
              Delete
            </button>
            {invoice.status !== "paid" && (
              <button className="px-[23.65px] py-3 bg-red-600-200 bg-color01 text-white font-bold rounded-3xl">
                Mark as Paid
              </button>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="h-[631px] flex flex-col gap-11.5 bg-white dark:bg-color03 rounded-lg px-12 py-12">
          {/* Informations de la facture */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-8">
            {/* top */}
            <div className="grid grid-cols-2 border border-red-500">
              {/* ID & Description */}
              <div className="flex flex-col gap-y-1.5">
                <p className="text-[0.938rem] font-bold text-color06">
                  #<span className="text-white font-medium">{invoice.id}</span>
                </p>
                <p className="text-[0.813rem]">{invoice.description}</p>
              </div>
              {/*  */}
            </div>
            <div>
              <p className="font-bold">Invoice Date</p>
              <p>{invoice.createdAt}</p>
              <p className="font-bold">Payment Due</p>
              <p>{invoice.paymentDue}</p>
            </div>
            <div>
              <p className="font-bold">Bill To</p>
              <p>{invoice.clientName}</p>
              <p>{invoice.clientAddress.street}</p>
              <p>
                {invoice.clientAddress.city}, {invoice.clientAddress.postCode}
              </p>
              <p>{invoice.clientAddress.country}</p>
            </div>
            <div>
              <p className="font-bold">Sent to</p>
              <p>{invoice.clientEmail}</p>
            </div>
          </div>

          {/* Items et Prix */}
          <div className="h-[264px] flex flex-col">
            {/* Items */}
            <div className="h-[184px] bg-gray-100 dark:bg-color04 px-8 pt-8 pb-10 rounded-t-lg">
              <div className="grid grid-cols-4 text-[0.813rem] dark:text-color05  border border-red-500">
                <p>Item Name</p>
                <p>QTY.</p>
                <p>Price</p>
                <p>Total</p>
              </div>
              {invoice.items.map((item) => (
                <div key={item.name} className="grid grid-cols-4 mb-2">
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>£{item.price.toFixed(2)}</p>
                  <p>£{item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Montant total */}
            <div className="h-[80px] flex justify-between items-center text-right text-lg  dark:bg-color08 px-8 rounded-b-lg">
              <p className="text-[0.813rem]">Amount Due</p>
              <p className="text-2xl font-bold">£ {invoice.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
