import { useState, useEffect, useRef } from "react";
import CalendarIcon from "../../../../public/images/icon-calendar.svg";
import ArrowLeftIcon from "../../../../public/images/icon-arrow-left.svg";
import ArrowRightIcon from "../../../../public/images/icon-arrow-right.svg";

interface DatePickerProps {
  initialDate?: Date;
  onDateChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  initialDate,
  onDateChange,
}) => {
  // état
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const dropdownRef = useRef<HTMLDivElement>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    daysInMonth
  ).getDay();

  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // comportement
  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    setSelectedDate(localDate);
    console.log("Selected Date: ", localDate);
    setShowCalendar(false);
    if (onDateChange) {
      console.log("onDateChange called with: ", localDate);
      onDateChange(localDate);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
      console.log("Current Year: ", currentYear);
    } else {
      setCurrentMonth(currentMonth - 1);
      console.log("Current Month: ", currentMonth);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
      console.log("Current Year: ", currentYear);
    } else {
      setCurrentMonth(currentMonth + 1);
      console.log("Current Month: ", currentMonth);
    }
  };

  const formatDate = (date: Date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    if (initialDate) {
      const localInitialDate = new Date(
        initialDate.getTime() - initialDate.getTimezoneOffset() * 60000
      );
      setSelectedDate(localInitialDate);
      setCurrentMonth(localInitialDate.getMonth());
      setCurrentYear(localInitialDate.getFullYear());
    }
  }, [initialDate]);

  // Ferme la dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // affichage
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="inline-flex justify-between items-center w-full bg-white dark:bg-color03 border border-color05 dark:border-color04 focus:border-color01 dark:focus:border-color01 focus:outline-none text-[0.938rem] font-bold text-color08 dark:text-white mt-1 pl-5 pr-4 py-2 rounded-md"
      >
        <span>{selectedDate ? formatDate(selectedDate) : "Select Date"}</span>
        <CalendarIcon />
      </button>

      {/* Dropdown content */}
      {showCalendar && (
        <div className="absolute z-10 top-full left-0 mt-2 w-[240px]  bg-white dark:bg-color04 p-4 rounded-md shadow-lg ">
          {/* header box */}
          <div className="flex items-center justify-between mt-2 mb-8">
            <button type="button" onClick={handlePrevMonth}>
              <ArrowLeftIcon />
            </button>
            <span className="text-[0.938rem] font-bold text-color08 dark:text-color05">
              {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <button type="button" onClick={handleNextMonth}>
              <ArrowRightIcon />
            </button>
          </div>
          {/* Days box*/}
          <div className="grid grid-cols-7 gap-4">
            {/* Les jours du mois précédent */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <button
                type="button"
                key={index}
                className="text-[0.938rem] font-bold text-[#ebebec] dark:text-[#343853] pointer-events-none"
              >
                {prevMonthDays - firstDayOfMonth + index + 1}
              </button>
            ))}
            {/* Les jours du mois encours */}
            {Array.from({ length: daysInMonth }, (_, day) => (
              <div
                key={day}
                onClick={() => handleDateClick(day + 1)}
                className={`w-full  text-[0.938rem] hover:text-color01 font-bold flex items-center justify-center outline-none  ${
                  selectedDate?.getDate() === day + 1 &&
                  selectedDate?.getMonth() === currentMonth &&
                  selectedDate?.getFullYear() === currentYear
                    ? " text-color01"
                    : "text-color08 dark:text-color05"
                }   `}
              >
                <button type="button" className="w-full hover:text-color01">
                  {day + 1}
                </button>
              </div>
            ))}
            {/* Les jours du mois suivant */}
            {Array.from({ length: 6 - lastDayOfMonth }).map((_, index) => (
              <button
                type="button"
                key={index}
                className="text-[0.938rem] font-bold text-[#ebebec] dark:text-[#343853] pointer-events-none"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
