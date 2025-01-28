
import React, { useState } from "react";
import { updateQuote } from "../utils/api";
import { getToken } from "../utils/auth";

const QuoteUpdate = () => {
  const [tempQuote, setTempQuote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    const data = await updateQuote(token, tempQuote);
    if (data.status === "ok") {
      setTempQuote("");
    }
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg w-full md:w-1/2">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Your Quote</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-700 font-medium">New Quote</label>
          <input
            type="text"
            placeholder="Enter your quote"
            value={tempQuote}
            onChange={(e) => setTempQuote(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full font-medium rounded-lg py-2 bg-purple-600 text-white hover:bg-purple-500 shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuoteUpdate;
