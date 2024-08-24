import React, { useState, useEffect } from "react";
import DeleteIcon from "../../../../../public/images/icon-delete.svg";
import PlusIcon from "../../../../../public/images/icon-plus.svg";
import { Invoice as InvoiceType } from "../../../types";
import PaymentTerms from "./paymentTerms";

interface InvoicePanelProps {
  onClose: () => void;
  mode: "create" | "edit";
  invoiceData?: InvoiceType;
}

const InvoicePanel: React.FC<InvoicePanelProps> = ({
  onClose,
  mode,
  invoiceData,
}) => {
  // état
  const [items, setItems] = useState(invoiceData?.items || []);
  const [formData, setFormData] = useState(invoiceData || {});

  // comportement
  useEffect(() => {
    // Mise à jour des items si invoiceData change
    if (invoiceData) {
      setItems(invoiceData.items || []);
      setFormData(invoiceData);
    }
  }, [invoiceData]);

  const addItem = () => {
    setItems([
      ...items,
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]);
  };

  const updateItem = (index: number, key: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: value };
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Logique de soumission du formulaire
  };

  // affichage
  const inputStyle = `w-full p-2 mt-1 bg-white dark:bg-color03 text-color08 dark:text-white border border-color05 dark:border-color04 focus:border-color01 focus:outline-none caret-color01 rounded-md`;
  const placeholderStyle = {
    paddingLeft: "10px",
    fontSize: "0.938rem",
    fontWeight: "bold",
  };
  const addButtonStyle = `w-full flex justify-center items-center gap-x-1 px-[23.65px] py-3 bg-[#F9FAFE] hover:bg-color05 dark:bg-color03 text-[0.813rem] font-bold text-color07 dark:text-color05 rounded-3xl mt-4`;
  const discardButtonStyle = `px-[23.65px] py-3 bg-[#F9FAFE] text-[0.813rem] text-color07 font-bold rounded-3xl`;
  const cancelButtonStyle = `px-[23.65px] py-3 bg-[#F9FAFE] dark:bg-color04 text-[0.813rem] text-color07 dark:text-color05 font-bold rounded-3xl`;
  const draftButtonStyle = `px-[23.65px] py-3 bg-[#373B53] hover:bg-color08 dark:hover:bg-color03 text-[0.813rem] text-color05 font-bold rounded-3xl`;
  const sendButtonStyle = `px-[23.65px] py-3 bg-color01 hover:bg-color02 text-[0.813rem] text-white font-bold rounded-3xl`;
  const titleSectionStyle = `text-[0.813rem] font-bold text-color01 mb-2`;
  const inputLabelStyle = `text-[0.813rem] font-medium text-color07 dark:text-color05`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="left-20 w-full sm:w-[719px] bg-white dark:bg-color12 h-full pl-[3.6rem] py-8 pr-8 relative overflow-y-auto scrollbar-thin scrollbar-webkit">
        {/* Titre */}
        <h2 className="text-2xl font-bold mb-4">
          {mode === "create" ? (
            "New Invoice"
          ) : (
            <>
              Edit <span className="text-color06">#</span>
              {invoiceData?.id}
            </>
          )}
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Section "Bill From" */}
          <div>
            <h3 className={`${titleSectionStyle}`}>Bill From</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className={`${inputLabelStyle}`}>Street Address</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.senderAddress.street || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>City</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.senderAddress.city || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>Post Code</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.senderAddress.postCode || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>Country</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.senderAddress.country || ""}
                />
              </div>
            </div>
          </div>

          {/* Section "Bill To" */}
          <div className="mt-6">
            <h3 className={`${titleSectionStyle}`}>Bill To</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className={`${inputLabelStyle}`}>
                  Client&apos;s Name
                </label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientName || ""}
                />
              </div>
              <div className="col-span-3">
                <label className={`${inputLabelStyle}`}>
                  Client&apos;s Email
                </label>
                <input
                  type="email"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientEmail || ""}
                  placeholder="e.g. email@example.com"
                />
              </div>
              <div className="col-span-3">
                <label className={`${inputLabelStyle}`}>Street Address</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientAddress.street || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>City</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientAddress.city || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>Post Code</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientAddress.postCode || ""}
                />
              </div>
              <div>
                <label className={`${inputLabelStyle}`}>Country</label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.clientAddress.country || ""}
                />
              </div>
            </div>
          </div>

          {/* Section "Invoice Details" */}
          <div className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`${inputLabelStyle}`}>Invoice Date</label>
                <input
                  type="date"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.createdAt || "21 Aug 2021"}
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className={`${inputLabelStyle}`}>Payment Terms</label>
                <PaymentTerms />
              </div>
              {/* Description */}
              <div className="col-span-2">
                <label className={`${inputLabelStyle}`}>
                  Project Description
                </label>
                <input
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  defaultValue={invoiceData?.description || ""}
                  placeholder="e.g. Graphic Design Service"
                />
              </div>
            </div>
          </div>

          {/* Section "Item List" */}
          <div className="mt-6 text-white">
            <h3 className="text-sm font-bold text-[#888EB0] mb-4">Item List</h3>
            {/* {items.length > 0 && ( */}
            <div className="grid grid-cols-itemGrid gap-y-0 gap-x-4 items-center mb-2 ">
              <label htmlFor="name" className={`${inputLabelStyle}`}>
                Item name
              </label>
              <label htmlFor="quantity" className={`${inputLabelStyle}`}>
                Qty.
              </label>
              <label htmlFor="price" className={`${inputLabelStyle}`}>
                Price
              </label>

              <span className={`${inputLabelStyle} text-left mr-2`}>Total</span>
            </div>
            {/* )} */}
            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-itemGrid gap-y-4 gap-x-4 items-center mb-2 "
              >
                <input
                  id="name"
                  type="text"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />
                <input
                  id="quantity"
                  type="number"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", Number(e.target.value))
                  }
                />
                <input
                  id="price"
                  type="number"
                  className={`${inputStyle}`}
                  style={placeholderStyle}
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", Number(e.target.value))
                  }
                />
                <span className="text-[0.938rem] font-bold text-color06 dark:text-color05">
                  {item.quantity * item.price}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="justify-self-end"
                >
                  <DeleteIcon className=" text-color06 hover:text-color09 transition-colors duration-200" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className={`${addButtonStyle}`}
            >
              <PlusIcon className=" text-color07 dark:text-color05 mt-[-3px]" />
              Add New Item
            </button>
          </div>

          {/* Buttons */}
          {mode === "edit" && (
            <div className="w-full flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`${cancelButtonStyle}`}
              >
                Cancel
              </button>
              <button type="submit" className={`${sendButtonStyle}`}>
                Save Changes
              </button>
            </div>
          )}
          {mode === "create" && (
            <div className="w-full flex justify-between gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`${discardButtonStyle}`}
              >
                Discard
              </button>
              <div>
                <button
                  type="submit"
                  onClick={onClose}
                  className={`${draftButtonStyle} mr-2`}
                >
                  Save as Draft
                </button>
                <button type="submit" className={`${sendButtonStyle}`}>
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InvoicePanel;
