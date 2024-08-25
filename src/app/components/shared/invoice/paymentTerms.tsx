"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../../../../public/images/icon-arrow-down.svg";

type PaymentTermsOptions =
  | "Net 1 Day"
  | "Net 7 Days"
  | "Net 14 Days"
  | "Net 30 Days";

interface PaymentTermsProps {
  onOptionChange?: (option: PaymentTermsOptions) => void;
}

const PaymentTerms: React.FC<PaymentTermsProps> = ({ onOptionChange }) => {
  // état
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] =
    useState<PaymentTermsOptions>("Net 30 Days");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // comportement
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionChange = (
    option: PaymentTermsOptions,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedOption(option);
    if (onOptionChange) {
      onOptionChange(option);
    }
    setIsOpen(false);
  };

  // Ferme la dropdown si on clique en dehors
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

  // affichage
  return (
    <div
      className="w-full relative inline-block text-left appearance-none"
      ref={dropdownRef}
    >
      {/* Bouton pour ouvrir la dropdown */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full bg-white dark:bg-color03 border border-color05 dark:border-color04 focus:border-color01 dark:focus:border-color01 focus:outline-none text-[0.938rem] font-bold text-color08 dark:text-white mt-1 pl-5 pr-4 py-[8.78px] rounded-md"
      >
        <span>{selectedOption}</span>
        <ArrowDownIcon
          className={`text-color01 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="select"
          className=" absolute right-0 w-full mt-2 rounded-lg shadow-2xl bg-white dark:bg-color04 z-10 divide-y divide-solid divide-color05 dark:divide-color03"
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
              } hover:text-color02`}
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

export default PaymentTerms;
