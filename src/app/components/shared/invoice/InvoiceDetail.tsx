"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Invoice as InvoiceType } from "../../../types";
import ArrowBackIcon from "../../../../../public/images/icon-arrow-left.svg";
import InvoicePanel from "./InvoicePanel";
import Button from "../button/Button";

interface InvoiceDetailProps {
  invoice: InvoiceType;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const router = useRouter();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<
    InvoiceType | undefined
  >(undefined);

  const [panelMode, setPanelMode] = useState<"create" | "edit">("create");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  // Fonction pour gérer le clic sur "Edit"
  const handleEditClick = (invoice: InvoiceType) => {
    setSelectedInvoice(invoice);
    setPanelMode("edit");
    setIsPanelOpen(true);
  };

  // Fonction pour ouvrir la popup de suppression
  const handleDeleteClick = () => {
    // setIsAsideHidden(true);
    setIsDeletePopupOpen(true);
  };

  // Fonction pour fermer la popup de suppression
  const closeDeletePopup = () => {
    // setIsAsideHidden(false);
    setIsDeletePopupOpen(false);
  };

  // Fonction pour supprimer la facture
  const deleteInvoice = () => {
    // TODO: Logique de suppression
    // setIsAsideHidden(false);
    setIsDeletePopupOpen(false);
    router.push("/invoices");
  };

  // Fonction pour fermer le panneau
  const closePanel = () => {
    setIsPanelOpen(false);
    setSelectedInvoice(undefined);
  };

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

  // affichage
  const editButtonStyle = `px-[23.65px] py-3 bg-[#F9FAFE] hover:bg-color05 dark:bg-color04 dark:hover:bg-white text-color07 dark:text-color05 dark:hover:text-color07 font-bold rounded-3xl`;
  // const paidButtonStyle = `px-[23.65px] py-3 bg-color01 hover:bg-color02 text-white font-bold rounded-3xl`;

  return (
    <div className="w-full max-w-[730px] min-w-[327px] mx-auto mt-16">
      {/* Bouton Retour */}
      <button
        onClick={() => router.back()}
        className="w-[80px] h-[15px] flex items-center justify-between text-color07 dark:text-white dark:hover:text-color06 mb-8"
      >
        <ArrowBackIcon />
        <span className="leading-none font-bold mb-[-4px]">Go back</span>
      </button>

      {/* Détails de la facture */}
      <div className="h-[743px] mx-auto flex flex-col gap-y-6 rounded-lg">
        {/* Header */}
        <div className="w-full h-[88px] flex justify-between items-center bg-white dark:bg-color03 rounded-lg px-8 shadow-md">
          {/* Text & Statut */}
          <div className="flex items-center gap-x-5">
            <span className="text-[0.813rem] text-[#858BB2] dark:text-color05">
              Status
            </span>
            <div
              className={`w-[104px] h-[40px] flex justify-center items-center gap-2 rounded-md ${statusClasses}`}
            >
              <div className={`w-2 h-2 rounded-full ${dotClasses}`}></div>
              <strong className="leading-none mb-[-3px]">
                {invoice.status.charAt(0).toUpperCase() +
                  invoice.status.slice(1)}
              </strong>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 ">
            {/* Affiche les boutons Edit et Delete uniquement si la facture n'est pas payée */}
            {invoice.status !== "paid" && (
              <div className="flex space-x-4">
                <Button
                  className={`${editButtonStyle}`}
                  variant="secondary"
                  size="large"
                  onClick={() => handleEditClick(invoice)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="large"
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </div>
            )}
            {/* Affiche les boutons Mark as Paid uniquement si la facture n'est pas payée */}
            {invoice.status !== "paid" && (
              <Button
                variant="primary"
                size="large"
                onClick={() => alert("Invoice marked as Paid")}
              >
                Mark as Paid
              </Button>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="h-[631px] flex flex-col gap-y-11 bg-white dark:bg-color03 rounded-lg px-12 py-12 shadow-sm">
          {/* Customer Infos */}
          <div className="flex flex-col">
            {/* top */}
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-1.5">
                <p className="text-[0.938rem] font-bold text-color06">
                  #
                  <span className="text-color08 dark:text-white font-bold">
                    {invoice.id}
                  </span>
                </p>
                <p className="text-[0.813rem] text-color07 dark:text-color05">
                  {invoice.description}
                </p>
              </div>
              <div className="text-[0.813rem] font-medium text-right text-color07 dark:text-color05">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>

            {/* Ivoice | Bill | Send */}
            <div className="flex gap-x-[116px]">
              {/* Invoice & Payment */}
              <div className="flex flex-col gap-y-8">
                <div>
                  <p className="text-[0.813rem] font-medium text-left text-color07 dark:text-color05 mb-5 leading-none">
                    Invoice Date
                  </p>
                  <p className="text-[0.938rem] font-bold leading-none text-color08 dark:text-white">
                    {invoice.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-[0.813rem] font-medium text-left text-color07 dark:text-color05 mb-5 leading-none">
                    Payment Due
                  </p>
                  <p className="text-[0.938rem] font-bold leading-none text-color08 dark:text-white">
                    {invoice.paymentDue}
                  </p>
                </div>
              </div>
              {/* Bill to */}
              <div className="flex flex-col gap-y-3">
                <div>
                  <p className="text-[0.813rem] font-medium text-left text-color07 dark:text-color05 mb-5 leading-none">
                    Bill To
                  </p>
                  <p className="text-[0.938rem] font-bold leading-none text-color08 dark:text-white">
                    {invoice.clientName}
                  </p>
                </div>
                <div className="text-[0.813rem] font-medium text-left text-color07 dark:text-color05">
                  <p>{invoice.clientAddress.street}</p>
                  <p>{invoice.clientAddress.city}</p>
                  <p>{invoice.clientAddress.postCode}</p>
                  <p>{invoice.clientAddress.country}</p>
                </div>
              </div>
              {/* Send */}
              <div>
                <p className="text-[0.813rem] font-medium text-left text-color07 dark:text-color05 mb-5 leading-none">
                  Sent to
                </p>
                <p className="text-[0.938rem] font-bold leading-none text-color08 dark:text-white">
                  {invoice.clientEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Items et Amount */}
          <div className="h-[264px] flex flex-col">
            <ul className="flex flex-col justify-center gap-y-8 h-[184px] bg-[#F9FAFE] dark:bg-color04 px-8 pt-8 pb-10 rounded-t-lg">
              <li className="flex justify-between text-[0.813rem] text-color07 dark:text-color05 leading-none">
                <p className="flex-1 text-[0.938rem] ">Item Name</p>
                <div className="flex-1 grid grid-cols-3 gap-x-16">
                  <p className="justify-self-center">QTY.</p>
                  <p className="justify-self-end">Price</p>
                  <p className="justify-self-end">Total</p>
                </div>
              </li>

              {/* Items Map */}
              {invoice.items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between dark:text-white font-bold text-[0.938rem] leading-none"
                >
                  <p className="flex-1 text-color08 dark:text-white">
                    {item.name}
                  </p>
                  <div className="flex-1 grid grid-cols-3 gap-x-16">
                    <p className="justify-self-center text-color07 dark:text-color05">
                      {item.quantity}
                    </p>
                    <p className="justify-self-end w-[90px] text-right text-color07 dark:text-color05">
                      £ {item.price.toFixed(2)}
                    </p>
                    <p className="justify-self-end w-[90px] text-right text-color08 dark:text-white ">
                      £ {item.total.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Amount */}
            <div className="h-[80px] flex justify-between items-center px-8 bg-[#373B53] dark:bg-black rounded-b-lg">
              <p className="text-white text-[0.813rem] leading-none">
                Amount Due
              </p>
              <p className="text-white text-[1.5rem] font-bold">
                £ {invoice.total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup de confirmation de suppression */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[480px] h-[249px] bg-white dark:bg-color03 px-12 py-14 rounded-lg">
            <h2 className="text-[1.5rem] font-bold text-color08 dark:text-white mb-3">
              Confirm Deletion
            </h2>
            <p className="text-[0.813rem] text-color06 dark:text-color05 mb-3.5">
              Are you sure you want to delete this invoice? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="cancel" size="large" onClick={closeDeletePopup}>
                Cancel
              </Button>
              <Button size="large" variant="danger" onClick={deleteInvoice}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Panneau latéral pour l'édition */}
      {isPanelOpen && (
        <InvoicePanel
          onClose={closePanel}
          mode={panelMode}
          invoiceData={selectedInvoice}
        />
      )}
    </div>
  );
};

export default InvoiceDetail;
