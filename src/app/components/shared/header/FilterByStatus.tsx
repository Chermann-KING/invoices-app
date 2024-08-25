"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../../../../public/images/icon-arrow-down.svg";
import CheckIcon from "../../../../../public/images/icon-check.svg";

type FilterStatus = "Draft" | "Pending" | "Paid";

interface FilterByStatusProps {
  onFilterChange: (status: FilterStatus) => void;
}

const FilterByStatus: React.FC<FilterByStatusProps> = ({ onFilterChange }) => {
  // état
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  // comportement
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusChange = (status: FilterStatus) => {
    setSelectedStatus(status);
    onFilterChange(status); // Appeler la fonction pour filtrer les factures
    setIsOpen(false); // Fermer la dropdown après sélection
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
      className="w-[192px] relative inline-block text-left"
      ref={dropdownRef}
    >
      {/* button to open dropdown */}
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center gap-x-4 w-full text-[0.9375rem] font-bold text-color08 dark:text-white focus:outline-none"
      >
        <span>Filter by status</span>
        <ArrowDownIcon
          className={`text-color01 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* dropdown */}
      <div
        className={`absolute right-0 w-[192px] rounded-lg shadow-lg bg-white dark:bg-color04 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        } mt-3.5 pt-4 pb-4 origin-top-right`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        {(["Draft", "Pending", "Paid"] as FilterStatus[]).map((status) => (
          <label
            key={status}
            className="cursor-pointer flex items-center text-[0.9375rem] font-bold dark:text-white px-6 py-2"
          >
            <input
              type="radio"
              name="filterByStatus"
              checked={selectedStatus === status}
              onChange={() => handleStatusChange(status)}
              className="hidden peer"
            />
            <div className="w-6 h-6 bg-color05 border border-transparent rounded-md peer-hover:border-purple-500 peer-checked:bg-purple-500 peer-checked:border-purple-500 dark:bg-color03 flex items-center justify-center">
              {selectedStatus === status && <CheckIcon />}
            </div>
            <span className="ml-3.5">{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByStatus;
