import React from "react";
import plusIcon from "../../../../../public/images/icon-plus.svg";
import Image from "next/image";

const Button = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="w-[150px] h-[48px] flex justify-between items-center pl-2 bg-color01 hover:bg-color02 rounded-3xl px-4 font-bold text-[15px] text-white"
    >
      <span className="w-[32px] h-[32px] rounded-full bg-white flex justify-center items-center">
        <Image src={plusIcon} width={10} height={10} alt="Icon plus" />
      </span>{" "}
      New Invoice
    </button>
  );
};

export default Button;
