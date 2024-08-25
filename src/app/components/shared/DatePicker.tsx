import { useEffect, useState } from "react";
import CalendarIcon from "../../../../public/images/icon-calendar.svg";
import ArrowLeftIcon from "../../../../public/images/icon-arrow-left.svg";
import ArrowRightIcon from "../../../../public/images/icon-arrow-right.svg";

interface DatePickerProps {
  initialDate?: Date; // Prop optionnelle pour passer une date par défaut
}

const DatePicker: React.FC<DatePickerProps> = ({ initialDate }) => {
  // état
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDate = (date: Date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    } as const;
    return date.toLocaleDateString("en-GB", options);
  };

  // Mise à jour si initialDate change
  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
      setCurrentMonth(initialDate.getMonth());
      setCurrentYear(initialDate.getFullYear());
    }
  }, [initialDate]);

  // affichage
  return (
    <div className="relative">
      {/* Dropdown button */}
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center justify-between w-full py-2 pl-5 pr-4 bg-white dark:bg-color03 text-[0.938rem] text-color08 dark:text-white border font-bold border-color05 dark:border-color04 focus:border-color01 dark:focus:border-color01 focus:outline-none rounded-md"
      >
        <span>{selectedDate ? formatDate(selectedDate) : "Select Date"}</span>
        <CalendarIcon />
      </button>

      {/* Dropdown content */}
      {showCalendar && (
        <div className="absolute z-10 top-full left-0 mt-2 w-[240px]  bg-white dark:bg-color04 p-4 rounded-md shadow-lg ">
          {/* header box */}
          <div className="flex items-center justify-between mt-2 mb-8">
            <button onClick={handlePrevMonth}>
              <ArrowLeftIcon />
            </button>
            <span className="text-[0.938rem] font-bold text-color08 dark:text-color05">
              {new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            <button onClick={handleNextMonth}>
              <ArrowRightIcon />
            </button>
          </div>
          {/* Days box*/}
          <div className="grid grid-cols-7 gap-4">
            {/* Les jours du mois précédent */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div
                key={index}
                className="text-[0.938rem] font-bold text-[#ebebec] dark:text-[#343853] pointer-events-none"
              >
                {prevMonthDays - firstDayOfMonth + index + 1}
              </div>
            ))}
            {/* Les jours du mois encours */}
            {Array.from({ length: daysInMonth }, (_, day) => (
              <button
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
                <span className="w-full hover:text-color01">{day + 1}</span>
              </button>
            ))}
            {/* Les jours du mois suivant */}
            {Array.from({ length: 6 - lastDayOfMonth }).map((_, index) => (
              <div
                key={index}
                className="text-[0.938rem] font-bold text-[#ebebec] dark:text-[#343853] pointer-events-none"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
