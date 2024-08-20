import React from "react";
import Image from "next/image";
import illustrationEmpty from "../../../../../public/images/illustration-empty.svg";

const NoInvoice = () => {
  return (
    <div className="mt-32 mx-auto w-[241px] flex flex-col items-center justify-center gap-y-16 text-center py-10">
      {/* image */}
      <div>
        <Image src={illustrationEmpty} alt="image d'information" />
      </div>
      {/* texte */}
      <div className="h-[76px] flex flex-col gap-y-[23px] ">
        <h2 className="text-2xl leading-none font-bold tracking-[-0.047rem]">
          There is nothing here
        </h2>
        <p className="text-[0.813rem] text-gray-500 leading-none dark:text-gray-400 px-6 ">
          Create an invoice by clicking the New Invoice button and get started
        </p>
      </div>
    </div>
  );
};

export default NoInvoice;
