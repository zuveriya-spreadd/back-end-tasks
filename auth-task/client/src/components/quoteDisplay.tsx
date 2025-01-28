import React from "react";

type Props = {
  quote: string;
};

const QuoteDisplay: React.FC<Props> = ({ quote }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Welcome to the Site
      </h1>

      <div className="flex flex-wrap md:flex-nowrap gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Quote:</h2>
          <p className="text-gray-700">{quote || "Not Found"}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
