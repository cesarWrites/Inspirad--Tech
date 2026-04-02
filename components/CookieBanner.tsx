"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center z-50">
      <p>
        We use cookies to improve your experience. By using our site, you agree
        to our cookie policy.
      </p>
      <div className="flex gap-3">
        <button
          onClick={rejectCookies}
          className="bg-gray-600 px-4 py-2 rounded"
        >
          Reject
        </button>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Accept
        </button>
      </div>
    </div>
  );
}