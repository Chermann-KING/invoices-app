"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../../../../public/images/icon-arrow-down.svg";

type PaymentTermsOptions =
  | "Net 1 Day"
  | "Net 7 Days"
  | "Net 14 Days"
  | "Net 30 Days";

interface PaymentTermsProps {
  selectedTerm?: number;
  onOptionChange?: (option: number) => void;
}

const PaymentTerms: React.FC<PaymentTermsProps> = ({
  selectedTerm = 30,
  onOptionChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PaymentTermsOptions>(
    convertNumberToOption(selectedTerm)
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (
    option: PaymentTermsOptions,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedOption(option);
    const numericValue = convertOptionToNumber(option);
    if (onOptionChange) {
      onOptionChange(numericValue);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full relative inline-block text-left appearance-none"
      ref={dropdownRef}
    >
      {/* bouton d'ouverture de la dropdown */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full bg-white dark:bg-color03 border border-color05 dark:border-color04 focus:border-color01 dark:focus:border-color01 focus:outline-none text-[0.938rem] font-bold text-color08 dark:text-white mt-1 pl-5 pr-4 py-2 rounded-md"
      >
        <span>{selectedOption}</span>
        <ArrowDownIcon
          className={`text-color01 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div
          role="select"
          className="absolute right-0 w-full mt-2 rounded-lg shadow-2xl bg-white dark:bg-color04 z-10 divide-y divide-solid divide-color05 dark:divide-color03"
        >
          {(
            [
              "Net 1 Day",
              "Net 7 Days",
              "Net 14 Days",
              "Net 30 Days",
            ] as PaymentTermsOptions[]
          ).map((option) => (
            <option
              key={option}
              className={`cursor-pointer px-6 py-3 text-[0.9375rem] font-bold transition-colors duration-200 ${
                selectedOption === option
                  ? "text-color02"
                  : "dark:text-color05 hover:text-color02 dark:hover:text-color02"
              }`}
              onClick={(e) => handleOptionChange(option, e)}
            >
              {option}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};

// Fonction pour convertir un nombre en chaîne de caractères
const convertNumberToOption = (num: number): PaymentTermsOptions => {
  switch (num) {
    case 1:
      return "Net 1 Day";
    case 7:
      return "Net 7 Days";
    case 14:
      return "Net 14 Days";
    case 30:
      return "Net 30 Days";
    default:
      return "Net 30 Days";
  }
};

// Fonction pour convertir une chaîne de caractères en nombre
const convertOptionToNumber = (option: PaymentTermsOptions): number => {
  switch (option) {
    case "Net 1 Day":
      return 1;
    case "Net 7 Days":
      return 7;
    case "Net 14 Days":
      return 14;
    case "Net 30 Days":
      return 30;
    default:
      return 30;
  }
};

export default PaymentTerms;
