"use client"; 
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUserFromToken, removeToken } from "../utils/auth";
import QuoteUpdate from "../components/quoteUpdate";
import QuoteDisplay from "../components/quoteDisplay";

const HTTP = process.env.NEXT_PUBLIC_HTTP_URL;

const Dashboard = () => {
  const router = useRouter();
  const [quote, setQuote] = useState<string>("");
  const [tempQuote, setTempQuote] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = getToken();
    if (token) {
      const decodedUser = getUserFromToken();
      if (!decodedUser) {
        removeToken();
        router.push("/login");
      } 
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  const user = getUserFromToken();

  if (!user) {
    removeToken();
    router.push("/login");
    return null;
  }

  async function populateQuote() {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${HTTP}quote`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.status === "ok") {
        setQuote(data.quote);
      } else {
        console.error(data.error);
      }
    } catch (e) {
      console.error("JSON Error", e);
    }
  }

    if (isClient && quote === "") {
      populateQuote();
    }

  async function updateQuote(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${HTTP}quote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quote: tempQuote }),
      });

      const data = await res.json();
      if (data.status === "ok" && data.quote) {
        setQuote(data.quote);
        setTempQuote("");
      } else {
        console.error(data.error || "Failed to update the quote.");
      }
    } catch (e) {
      console.error("JSON Error", e);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />

      <div className="flex flex-wrap md:flex-nowrap gap-8 w-full max-w-xl">
        <QuoteDisplay quote={quote} />
        <QuoteUpdate  />
      </div>
    </div>
  );
};

export default Dashboard;
