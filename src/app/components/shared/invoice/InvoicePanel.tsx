import React, { useState, useEffect } from "react";
import DeleteIcon from "../../../../../public/images/icon-delete.svg";
import PlusIcon from "../../../../../public/images/icon-plus.svg";
import { Invoice as InvoiceType } from "../../../types";
import PaymentTerms from "./paymentTerms";
import DatePicker from "../DatePicker";
import { Invoice } from "../../../types";
import Button from "../button/Button";

interface InvoicePanelProps {
  onClose: () => void;
  mode: "create" | "edit";
  invoiceData?: InvoiceType;
}

// LabeledInput
const InputLabel = ({ label, error }: any) => {
  const labelStyle = `text-[0.813rem] font-medium ${
    error ? "text-color09" : "text-gray-500 dark:text-color05"
  }`;

  const errorStyle = "text-color09 text-[0.625rem] font-semibold";

  return (
    <div className="flex justify-between items-center">
      <label className={`${labelStyle}`}>{label}</label>
      {error && <span className={errorStyle}>{error}</span>}
    </div>
  );
};

const InvoicePanel: React.FC<InvoicePanelProps> = ({
  onClose,
  mode,
  invoiceData,
}) => {
  // état
  const [items, setItems] = useState(invoiceData?.items || []);

  // Calcul de la date d'échéance en fonction de la date de création et des termes de paiement
  const calculatePaymentDue = (
    createdAt: string,
    paymentTerms: number
  ): string => {
    const creationDate = new Date(createdAt);
    creationDate.setDate(creationDate.getDate() + paymentTerms);
    return creationDate.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState<Invoice>(
    invoiceData || {
      id: "",
      createdAt: new Date().toISOString().split("T")[0],
      paymentDue: calculatePaymentDue(
        new Date().toISOString().split("T")[0],
        30
      ),
      description: "",
      paymentTerms: 30,
      clientName: "",
      clientEmail: "",
      status: "draft",
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [],
      total: 0,
    }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // comportement
  useEffect(() => {
    // Mise à jour des items si invoiceData change
    if (invoiceData) {
      setItems(invoiceData.items || []);
      setFormData(invoiceData);
    }
  }, [invoiceData]);

  useEffect(() => {
    if (!invoiceData) {
      // Seulement en mode `create`
      setFormData((prev) => ({
        ...prev,
        paymentDue: calculatePaymentDue(prev.createdAt, prev.paymentTerms),
      }));
    }
  }, [invoiceData, formData.createdAt, formData.paymentTerms]);

  const calculateTotal = (items: any[]) => {
    return items.reduce(
      (acc: number, item: { price: number; quantity: number }) =>
        acc + item.price * item.quantity,
      0
    );
  };

  const addItem = () => {
    const newItems = [
      ...items,
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ];
    setItems(newItems);
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: newItems,
      total: calculateTotal(newItems),
    }));
  };

  const updateItem = (index: number, key: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [key]: value };

    // Assuming you need to recalculate total if key is 'quantity' or 'price'
    if (key === "quantity" || key === "price") {
      updatedItems[index].total =
        updatedItems[index].price * updatedItems[index].quantity;
    }

    setItems(updatedItems);
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let hasEmptyFields = false;

    if (!formData.senderAddress?.street) {
      newErrors.senderAddressStreet = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.senderAddress?.city) {
      newErrors.senderAddressCity = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.senderAddress?.postCode) {
      newErrors.senderAddressPostCode = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.senderAddress?.country) {
      newErrors.senderAddressCountry = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.clientName) {
      newErrors.clientName = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.clientEmail) {
      newErrors.clientEmail = "can't be empty";
      hasEmptyFields = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "email is invalid";
    }
    if (!formData.clientAddress?.street) {
      newErrors.clientAddressStreet = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.clientAddress?.city) {
      newErrors.clientAddressCity = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.clientAddress?.postCode) {
      newErrors.clientAddressPostCode = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.clientAddress?.country) {
      newErrors.clientAddressCountry = "can't be empty";
      hasEmptyFields = true;
    }
    if (!formData.description) {
      newErrors.description = "can't be empty";
      hasEmptyFields = true;
    }
    // Validate items
    if (items.length === 0) {
      newErrors.items = "- An item must be added";
    } else {
      items.forEach((item, index) => {
        if (!item.name) {
          newErrors[`itemName${index}`] = "can't be empty";
          hasEmptyFields = true;
        }
        if (item.quantity <= 0) {
          newErrors[`itemQuantity${index}`] =
            "Quantity must be greater than zero";
          hasEmptyFields = true;
        }
        if (item.price <= 0) {
          newErrors[`itemPrice${index}`] = "Price must be greater than zero";
          hasEmptyFields = true;
        }
        item.total = item.quantity * item.price; // Calcul du total pour chaque item
      });
    }

    // For debugging
    console.log("Validation errors: ", newErrors);

    // Erreur globale
    if (hasEmptyFields) {
      newErrors.formData = "- All fields must be added";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (date: Date) => {
    console.log("Date received from DatePicker: ", date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      createdAt: date.toISOString().split("T")[0],
      paymentDue: calculatePaymentDue(
        date.toISOString().split("T")[0],
        prevFormData.paymentTerms
      ),
    }));
  };

  const handlePaymentTermsChange = (newTerms: number) => {
    setFormData((prev) => ({
      ...prev,
      paymentTerms: newTerms,
      paymentDue: calculatePaymentDue(prev.createdAt, newTerms),
    }));
  };

  // const handleSaveAndSend = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   handleSubmit("send");
  // };

  // const handleSaveAsDraft = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   handleSubmit("draft");
  // };

  // const handleSubmit = (actionType: "draft" | "send") => {
  //   // TODO: Logique de prétraitement avant la soumission
  //   console.log(`Traitement de la facture en tant que ${actionType}`);

  //   if (validateForm()) {
  //     // Ajustement du statut en fonction du type d'action
  //     const newStatus = actionType === "send" ? "pending" : "draft";
  //     setFormData((prev) => ({
  //       ...prev,
  //       status: newStatus,
  //     }));

  //     console.log("FormData après la mise à jour du statut:", formData);

  //     // TODO: Logique pour enregistrer les données ou les envoyer à un serveur

  //     // S'assurer de la mise à jour de l'état après les opérations asynchrones si nécessaire
  //   } else {
  //     console.log("La validation du formulaire a échoué", errors);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionType = (e.target as HTMLFormElement).getAttribute(
      "data-action-type"
    ) as "draft" | "send";

    if (validateForm()) {
      const newStatus = actionType === "send" ? "pending" : "draft";
      setFormData((prev) => ({
        ...prev,
        status: newStatus,
      }));
      console.log("FormData après la mise à jour du statut:", formData);
    } else {
      console.log("La validation du formulaire a échoué", errors);
    }
  };

  const inputStyleWithError = (errorKey: string) => `
    w-full p-2 mt-1 bg-white dark:bg-color03 text-color08 dark:text-white 
    border ${
      errors[errorKey] ? "border-red-500" : "border-color05 dark:border-color04"
    } 
    focus:border-color01 focus:outline-none caret-color01 rounded-md
  `;
  const inputStyle = `
    w-full p-2 mt-1 bg-white dark:bg-color03 text-color08 dark:text-white border-color05 dark:border-color04 
    focus:border-color01 focus:outline-none caret-color01 rounded-md
  `;
  const placeholderStyle = {
    paddingLeft: "10px",
    fontSize: "0.938rem",
    fontWeight: "bold",
  };
  const titleSectionStyle = `text-[0.813rem] font-bold text-color01 mb-2`;

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
        <form onSubmit={handleSubmit} data-action-type="send">
          {/* Section "Bill From" */}
          <div>
            <h3 className={`${titleSectionStyle}`}>Bill From</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* street */}
              <div className="col-span-3">
                <InputLabel
                  label="Street Address"
                  error={errors.senderAddressStreet}
                />
                <input
                  type="text"
                  className={inputStyleWithError("senderAddressStreet")}
                  style={placeholderStyle}
                  value={formData.senderAddress.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* city */}
              <div>
                <InputLabel label="City" error={errors.senderAddressCity} />
                <input
                  type="text"
                  className={inputStyleWithError("senderAddressCity")}
                  style={placeholderStyle}
                  value={formData.senderAddress.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* post code */}
              <div>
                <InputLabel
                  label="Post Code"
                  error={errors.senderAddressPostCode}
                />
                <input
                  type="text"
                  className={inputStyleWithError("senderAddressPostCode")}
                  style={placeholderStyle}
                  value={formData.senderAddress.postCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        postCode: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* contry */}
              <div>
                <InputLabel
                  label="Country"
                  error={errors.senderAddressCountry}
                />
                <input
                  type="text"
                  className={inputStyleWithError("senderAddressCountry")}
                  style={placeholderStyle}
                  value={formData.senderAddress.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      senderAddress: {
                        ...formData.senderAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section "Bill To" */}
          <div className="mt-6">
            <h3 className={`${titleSectionStyle}`}>Bill To</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* client's name */}
              <div className="col-span-3">
                <InputLabel label="Client's Name" error={errors.clientName} />
                <input
                  type="text"
                  className={inputStyleWithError("clientName")}
                  style={placeholderStyle}
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientName: e.target.value,
                    })
                  }
                />
              </div>
              {/* client's email */}
              <div className="col-span-3">
                <InputLabel label="Client's Email" error={errors.clientEmail} />
                <input
                  type="email"
                  className={inputStyleWithError("clientEmail")}
                  style={placeholderStyle}
                  value={formData.clientEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientEmail: e.target.value,
                    })
                  }
                  placeholder="e.g. email@example.com"
                />
              </div>
              {/* street adress */}
              <div className="col-span-3">
                <InputLabel
                  label="Street Adress"
                  error={errors.clientAddressStreet}
                />
                <input
                  type="text"
                  className={inputStyleWithError("clientAddressStreet")}
                  style={placeholderStyle}
                  value={formData.clientAddress.street}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        street: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* city */}
              <div>
                <InputLabel label="City" error={errors.clientAddressCity} />
                <input
                  type="text"
                  className={inputStyleWithError("clientAddressCity")}
                  style={placeholderStyle}
                  value={formData.clientAddress.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* post code */}
              <div>
                <InputLabel
                  label="Post Code"
                  error={errors.clientAddressPostCode}
                />
                <input
                  type="text"
                  className={inputStyleWithError("clientAddressPostCode")}
                  style={placeholderStyle}
                  value={formData.clientAddress.postCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        postCode: e.target.value,
                      },
                    })
                  }
                />
              </div>
              {/* country */}
              <div>
                <InputLabel
                  label="Country"
                  error={errors.clientAddressCountry}
                />
                <input
                  type="text"
                  className={inputStyleWithError("clientAddressCountry")}
                  style={placeholderStyle}
                  value={formData.clientAddress.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      clientAddress: {
                        ...formData.clientAddress,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section "Invoice Details" */}
          <div className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {/* Invoice date */}
                <div>
                  <label
                    className={`text-[0.813rem] font-medium text-gray-500 dark:text-color05`}
                  >
                    Invoice Date
                  </label>
                  <DatePicker
                    initialDate={new Date(formData.createdAt)}
                    onDateChange={handleDateChange}
                  />
                </div>
                {/* Payement terms */}
                <div>
                  <label
                    className={`text-[0.813rem] font-medium text-gray-500 dark:text-color05`}
                  >
                    Payment Terms
                  </label>
                  <PaymentTerms
                    selectedTerm={formData.paymentTerms}
                    onOptionChange={handlePaymentTermsChange}
                  />
                </div>
              </div>
              {/* Description */}
              <div className="col-span-2">
                <InputLabel
                  label="Project Description"
                  error={errors.description}
                />
                <input
                  type="text"
                  className={inputStyleWithError("description")}
                  style={placeholderStyle}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
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
              <label
                htmlFor="name"
                className={`text-[0.813rem] font-medium text-gray-500 dark:text-color05`}
              >
                Item name
              </label>
              <label
                htmlFor="quantity"
                className={`text-[0.813rem] font-medium text-gray-500 dark:text-color05`}
              >
                Qty.
              </label>
              <label
                htmlFor="price"
                className={`text-[0.813rem] font-medium text-gray-500 dark:text-color05`}
              >
                Price
              </label>

              <span
                className={`text-[0.813rem] font-medium text-left text-gray-500 dark:text-color05`}
              >
                Total
              </span>
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
                  className={inputStyleWithError("items")}
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
                  value={item.price.toFixed(2)}
                  onChange={(e) =>
                    updateItem(index, "price", Number(e.target.value))
                  }
                />
                <span className="text-[0.938rem] font-bold text-color06 dark:text-color05">
                  {(item.quantity * item.price).toFixed(2)}
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
            <Button
              type="button"
              variant="secondary"
              size="large"
              className={`w-full justify-center gap-x-1 mt-4`}
              onClick={addItem}
            >
              <PlusIcon className=" text-color07 dark:text-color05 mt-[-3px]" />
              <span>Add New Item</span>
            </Button>
          </div>

          {/* Global errors */}
          <div className="flex flex-col mt-8">
            {errors.formData && (
              <span className="text-[0.625rem] font-semibold text-color09">
                {errors.formData}
              </span>
            )}
            {errors.items && (
              <span className="text-[0.625rem] font-semibold text-color09">
                {errors.items}
              </span>
            )}
          </div>

          {/* Buttons */}
          {mode === "edit" && (
            <div className="w-full flex justify-end gap-2 mt-6">
              <Button
                type="button"
                variant="cancel"
                size="large"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                data-action-type="send"
                variant="primary"
                size="large"
                // onClick={handleSaveAndSend}
                // onClick={(e) => handleSubmit(e as any, "send")}
              >
                Save Changes
              </Button>
            </div>
          )}
          {mode === "create" && (
            <div className="w-full flex justify-between mt-6">
              <Button
                type="button"
                variant="discard"
                size="large"
                onClick={() => onClose()}
              >
                Discard
              </Button>
              <div className="flex gap-x-2">
                <Button
                  type="submit"
                  data-action-type="draft"
                  variant="draft"
                  size="large"
                  // onClick={handleSaveAsDraft}
                  // onClick={(e) => handleSubmit(e as any, "draft")}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  data-action-type="send"
                  variant="primary"
                  size="large"
                  // onClick={handleSaveAndSend}
                  // onClick={(e) => handleSubmit(e as any, "send")}
                >
                  Save & Send
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default InvoicePanel;
